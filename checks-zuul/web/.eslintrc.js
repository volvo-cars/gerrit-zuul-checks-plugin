__plugindir = 'checks-zuul/web';
module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    'jsdoc/require-file-overview': ['error', {
      tags: {
        license: {
          mustExist: false,
          preventDuplicates: true,
        },
      },
    }],
  },
};
