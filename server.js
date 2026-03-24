import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// cPanel/Passenger uses process.env.PORT automatically
const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Logging for debugging cPanel startup
console.log('Server Initialization...');
console.log(`Current Directory: ${__dirname}`);

app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send(`
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>Configuration Error</h1>
        <p>The <code>dist</code> folder is missing. Please run <code>npm run build</code> in the terminal.</p>
        <p>Path checked: ${distPath}</p>
      </div>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});