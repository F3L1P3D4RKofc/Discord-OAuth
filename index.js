const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const config = require('./config');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
  secret: 'MY_SECRET_SESSION_KEY',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('dashboard', { user: req.user });
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
