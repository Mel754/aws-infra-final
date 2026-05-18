#!/bin/bash
apt-get update -y
apt-get install -y nodejs npm

mkdir -p /app
cd /app

cat > package.json << 'EOF'
{
  "name": "aws-infra-final",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": { "express": "^4.18.2" }
}
EOF

cat > index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname()
  });
});

app.get('/status', (req, res) => {
  res.status(200).json({ service: 'aws-infra-final', version: '1.0.0', uptime: process.uptime() });
});

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
EOF

npm install
node index.js &
