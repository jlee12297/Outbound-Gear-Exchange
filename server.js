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

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: 'outboundgearexchange@hotmail.com',
        pass: 'Gear4Lyfe!',
    }
  })

  let message = {
    gear:req.body.gear,
    name:req.body.name,
    email:req.body.email,
    date:req.body.date,
    message:req.body.message
  };

  let gearOwner = {
    ownerEmail:req.body.owneremail
  }

  await transport.sendMail({
    from: 'outboundgearexchange@hotmail.com',
    to: `${gearOwner.ownerEmail}`,//this will have to be a template literal
    subject: 'Gear Request',
    // text: 'Hello?',
    html: `
    <p>You have a new gear request from ${message.name}.</p>
    <br>
    <p>${message.name} would like to request Gear ID: ${message.gear} from your cache starting on ${message.date}.</p>
    <br>
    <p>Their message is included below:
    <br>
    ${message.message}.
    </p>
    <p>Please reply to them at the following email address to confirm the gear exchange: ${message.email}.
    <br>
    <p>Sincerely,</p>
    <p>Your Outbound Gear Exchange Team</p>
    `
  })
  // res.send()
  // alert('Email has been sent')
  // ',{msg: 'Email has been sent'})
  // res.redirect('/search')
  res.render('search', {msg:'Email has been sent!'})
  console.log(req.body)
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
