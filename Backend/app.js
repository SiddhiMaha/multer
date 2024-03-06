const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/upload/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
  
});

app.use('/api/v1', require('./routes/userRoute'));
app.use('/api/v1', require('./routes/productRoute'));
app.use('/uploads/images', express.static('uploads/images'));

module.exports = app;
