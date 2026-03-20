import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Log environment for debugging
console.log(`Starting server in ${process.env.NODE_ENV || 'production'} mode`);

// Serve the static files from the Vite build directory
// In cPanel, 'dist' is usually where GitHub Actions or your build script puts the files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Linked to GitHub Repository: ${process.env.GIT_REPO_URL || 'Direct Deployment'}`);
});