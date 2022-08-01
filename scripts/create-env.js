const fs = require('fs');

fs.writeFileSync('./.test', `API_KEY = ${process.env.API_KEY}\n`);