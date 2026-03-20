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

// Check if dist folder exists to prevent Internal Server Error crashes
if (!fs.existsSync(distPath)) {
  console.error('ERROR: "dist" folder not found! Did you run "npm run build"?');
} else if (!fs.existsSync(indexPath)) {
  console.error('ERROR: "dist/index.html" not found!');
}

app.use(express.static(distPath));

// Handle React routing
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Application not built. Please run "npm run build" and restart the server.');
  }
});

app.listen(port, () => {
  console.log(`Server is successfully running on port ${port}`);
});