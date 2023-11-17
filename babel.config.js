module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ["@babel/plugin-transform-class-properties"],
    ['@babel/plugin-transform-flow-strip-types'],

    [
      'module-resolver',
      {
        alias: {
          '@/src': './src/',
        }
      }
    ]
  ]
};
