import ChromeExtension from 'crx';
import fs from 'fs';
import { join } from 'path';
import execThen from './execThen';
import { package as packageConfig } from '../config';

export default (version) => new Promise((resolve, reject) => {
  let manifest = require(join(__dirname, '..', 'src', 'manifest.json'));
  manifest.version = version;
  fs.writeFileSync(join(__dirname, '..', 'src', 'manifest.json'), JSON.stringify(manifest, null, 2));

  const crxFileName = `${packageConfig.crxFileName}.crx`;

  const crx = new ChromeExtension({
    codebase: `https://github.com/${packageConfig.repo}/raw/master/package/${crxFileName}`,
    privateKey: fs.readFileSync(join(__dirname, '..', 'key.pem'))
  });

  execThen('npm run build').then(() => {

    crx
      .load(join(__dirname, '..', 'build'))
      .then((crx) => {

        return crx.pack()
        .then((crxBuffer) => {
          try {
            const updateXML = crx.generateUpdateXML();
            fs.writeFileSync(join(__dirname, '..', 'package', 'update.xml'), updateXML);
            fs.writeFileSync(join(__dirname, '..', 'package', crxFileName), crxBuffer);
            resolve();
          } catch (e) {
            reject(e);
          }

        }, (error) => {
          reject(error);
        })

      })
      .catch(err => reject(err))
    ;
  }).catch(err => reject(err));
});
