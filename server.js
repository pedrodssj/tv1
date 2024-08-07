const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000; // Porta para o servidor local

// Middleware para adicionar cabeçalhos CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite todos os domínios
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para redirecionar as requisições
app.use('/proxy', createProxyMiddleware({
    target: 'https://abc.embedmax.site',
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Remove a parte '/proxy' do caminho
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxy request: ${req.method} ${req.url}`);

        // Adicione cabeçalhos adicionais se necessário
        proxyReq.setHeader('Authorization', 'Bearer YOUR_TOKEN');
        // Se precisar de outros cabeçalhos, adicione-os aqui
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    },
}));

app.listen(port, () => {
    console.log(`Servidor local rodando na porta ${port}`);
});
