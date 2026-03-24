import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Path to the distribution folder
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('--- Server Starting ---');
console.log(`Directory: ${__dirname}`);
console.log(`Checking for dist folder at: ${distPath}`);

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle React routing - return index.html for all non-api requests
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('<h1>Internal Server Error</h1><p>The "dist" folder was not found. Please run "npm run build" on the server.</p>');
  }
});

app.listen(port, () => {
  console.log(`Server is successfully running on port ${port}`);
});