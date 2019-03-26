const express = require('express');
const path = require('path');
const sslify = require('express-sslify');

const PORT = process.env.PORT || 3657;

const GMAIL_USER = process.env.GMAIL_USER;
if (!GMAIL_USER) {
    throw 'environment variable: GMAIL_USER not set';
}

const GMAIL_PASS = process.env.GMAIL_PASS;
if (!GMAIL_PASS) {
  throw 'environment variable: GMAIL_PASS not set';
}

const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

if (PORT !== 3657) {
  app.use(sslify.HTTPS({
    trustProtoHeader: true,
    trustAzureHeader: true,
    trustXForwardedHostHeader: true
  }));
}

app.use(bodyParser.urlencoded({extended: true}));

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

// POST route from contact form
app.post('/contact', function (req, res) {
    const mailServer = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });
    const message = 'Message from: ' + req.body['email'] + ' <' + req.body['name'] + '>:\n' + req.body['message'];
    const mailInfo = {
        from: GMAIL_USER,
        to: GMAIL_USER,
        subject: 'New message from contact form',
        text: message
    };
    mailServer.sendMail(mailInfo, function (error) {
        if (error) {
            res.render(
              'pages/contact',
              {
                title: 'Contact',
                message: false,
                error: 'ERROR! Mail has not been sent<br />' + error
              }
          );
        }
        else {
            res.render('pages/contact', {title: 'Contact', message: 'Message Sent!', error: false});
        }
    });
});

app
  .get('/', (req, res) => res.render('pages/index', {title: 'Home'}))
  .get('/about', (req, res) => res.render('pages/about', {title: 'About Me'}))
  .get('/skills', (req, res) => res.render('pages/skills', {title: 'Skills'}))
  .get('/portfolio', (req, res) => res.render('pages/portfolio', {title: 'Portfolio'}))
  .get('/events', (req, res) => res.render('pages/events', {title: 'Events'}))
  .get('/blog', (req, res) => res.render('pages/blog', {title: 'Blog'}))
  .get('/interests', (req, res) => res.render('pages/interests', {title: 'Interests'}))
  .get('/photos', (req, res) => res.render('pages/photos', {title: 'Photos'}))
  .get('/contact', (req, res) => res.render('pages/contact', {title: 'Contact', error: false, message: false}))
  .get('/sitemap', (req, res) => res.render('pages/sitemap', {title: 'Site Map'}))
  .get('/resume', (req, res) => res.render('pages/blog', {title: 'Resume'}));

app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
