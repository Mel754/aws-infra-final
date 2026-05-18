const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname()
  });
});

app.get('/status', (req, res) => {
  res.status(200).json({
    service: 'aws-infra-final',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'API funcionando correctamente',
    data: { items: ['item1', 'item2', 'item3'] }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
