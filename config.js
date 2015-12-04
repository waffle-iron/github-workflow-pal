

module.exports = {
  webpack: {
    eslint: true,
    port: 3000,
    devTool: 'eval-source-map'
  },
  package: {
    repo: 'buildo/infra/chrome-extensions/buildo-gh-workflow',
    crxFileName: 'buildo-gh-workflow'
  }
};
