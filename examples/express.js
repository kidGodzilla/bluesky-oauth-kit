const express = require('express');
const { setupExpressAuth } = require('../index.js');

const app = express();
setupExpressAuth(app, { BASE_URL: 'http://localhost:5001' });

app.listen(5001, () => console.log('Server running on port 5001'));
