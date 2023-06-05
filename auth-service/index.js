const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('./config');

const app = express();
const { secretKey } = config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (validateCredentials(username, password)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

function validateCredentials(username, password) {
  return username === 'admin' && password === 'password';
}

app.listen(3000, () => {
  console.info('Server started on port 3000');
});
