module.exports = function (api) {
  api.cache(false);

  return {
    presets: [
      ['@babel/preset-react', { useBuiltIns: true, loose: true, corejs: 3 }],
    ],
    plugins: [
      ['@babel/plugin-transform-typescript', { isTSX: true }],
    ],
  };
};
