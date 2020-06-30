const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ed9327",
              "@border-radius-base": "3px",
              "@btn-shadow": "none",
              "@btn-primary-shadow": "none",
              "@btn-text-shadow": "none",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
