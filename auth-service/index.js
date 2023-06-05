const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const config = require('./config');

const app = express();
const { secretKey } = config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (validateCredentials(username, password)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

app.get('/verify', (req, res) => {
  let token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  token = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, secretKey);

    return res.json({ valid: true });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

function validateCredentials(username, password) {
  return username === 'admin' && password === 'password';
}

app.listen(3000, () => {
  console.info('Server started on port 3000');
});
