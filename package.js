import packingCrx from './utils/packingCrx';

packingCrx('dev-version')
  .then((msg) => {
    console.log('Finished!', msg);
  })
  .catch(err => console.log(err));
