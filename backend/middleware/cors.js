const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', 
  credentials: true,
};

module.exports = cors(corsOptions);
