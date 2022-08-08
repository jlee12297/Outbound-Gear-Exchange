require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const bodyParser= require('body-parser') ;
const app = express();
// const searchPage = require()

app.use(express.static('public'))


// View engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// document.querySelectorAll("#request.btn").addEventListenenr("submit", e=>{
//     e.preventDefault();
//     app.get('/search', (req, res) => {
//     console.log(req.body)
//     })
// })

const output = `
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
    `;


let transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: 'outboundgearexchange@hotmail.com',
        pass: 'Gear4Lyfe!'
    }
});

const mailOptions = {
    from: 'outboundgearexchange@hotmail.com',
    to: 'kristen.l.santee@gmail.com',
    subject: 'Gear Request',
    text: 'Hello?',
    html: output
}

transport.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log("Email sent!", info);
    }
});

