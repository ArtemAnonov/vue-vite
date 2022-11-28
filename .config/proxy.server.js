module.exports = {
  //             '/': {
  //   target: 'http://localhost',
  //   secure: false,
  //   changeOrigin: true,
  //   autoRewrite: true,
  //   headers: {
  //     'X-ProxiedBy-Webpack': true,
  //   },
  // },
  "/wp-json/": {
    target: "http://localhost",
    secure: false,
    changeOrigin: true,
  },
};
