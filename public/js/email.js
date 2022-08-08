// require('dotenv').config();
// const { application } = require('express');
// const nodemailer = require('nodemailer');
// const exhbs = require('express-handlebars');
// const bodyParser= require('body-parser') ;

// app.use(express.static('public'))

// // View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handelbars');

// //Body Parser middleware
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// document.querySelectorAll("#email.btn").addEventListenenr("submit", e=>{
//     e.preventDefault();
//     app.get('/search', (req, res) => {
//     console.log(req.body)
//     })
// })

// const output = `
//     <p>You have a new gear request from ${req.body.name}.</p>
//     <br>
//     <p>${req.body.name} would like to request gear item ${gear} from your cache starting on ${req.body.date}.</p>
//     <br>
//     <p>Their message is included below:
//     ${req.body.message}
//     </p>
//     <br>
//     <p>Sincerely,</p>
//     <p>Your Outbound Gear Exchange Team</p>
//     `;


// let transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// const mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to: 'kristen.l.santee@gmail.com',
//     subject: 'Gear Request',
//     html: output
// }

// transport.sendMail(mailOptions, function(err, info) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("Email sent!", info);
//     }
// });
