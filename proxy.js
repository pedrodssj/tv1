// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://abc.embedmax.site',
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '', // Remove a parte '/proxy' do caminho
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxy request: ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
  });

  return proxy(req, res);
};
