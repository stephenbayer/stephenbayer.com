const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3657;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .get('/', (req, res) => res.render('pages/index', {title: 'Home'}))
  .get('/about', (req, res) => res.render('pages/about', {title: 'About Me'}))
  .get('/skills', (req, res) => res.render('pages/skills', {title: 'Skills'}))
  .get('/portfolio', (req, res) => res.render('pages/portfolio', {title: 'Portfolio'}))
  .get('/blog', (req, res) => res.render('pages/blog', {title: 'Blog'}))
  .get('/interests', (req, res) => res.render('pages/interests', {title: 'Interests'}))
  .get('/photos', (req, res) => res.render('pages/photos', {title: 'Photos'}))
  .get('/contact', (req, res) => res.render('pages/contact', {title: 'Contact'}))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
