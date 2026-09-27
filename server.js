const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const STATIC_DIR = path.join(__dirname, 'responsive-camping-website-main');
const GENERATED_IMAGES_DIR = path.join(__dirname, 'src', 'assets', 'images');

app.use('/src/assets/images', express.static(GENERATED_IMAGES_DIR));
app.use(express.static(STATIC_DIR));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
