const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs= require("express-handlebars");
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser= require('body-parser') ;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({  });
app.use(express.static("public"))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.post("/send", async (req,res) => {
  let {text} = req.body
  const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: 'outboundgearexchange@hotmail.com',
        pass: 'Gear4Lyfe!'
    }
  })
  await transport.sendMail({
    from: 'outboundgearexchange@hotmail.com',
    to: 'kristen.l.santee@gmail.com',
    subject: 'Gear Request',
    text: 'Hello?',
    html: `
    <p>You have a new gear request from Kristen.</p>
    <br>
    <p>Kristen would like to request gear item 123 from your cache starting on 8/5.</p>
    <br>
    <p>Their message is included below:
    This is a test!
    </p>
    <br>
    <p>Sincerely,</p>
    <p>Your Outbound Gear Exchange Team</p>
    `
  })
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
