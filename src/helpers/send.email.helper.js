const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const userName = 'SHEMA';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZW1hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hlbWFlcmljIiwiaXNWZXJpZmllZCI6ImZhbHNlIiwiaWF0IjoxNTc2MjI0NzQ3LCJleHAiOjE1NzYzMTExNDd9.oc58Q8PU23LbXZIoWLCFXtppN9ds_rzP3Snjb79bQMo';

const view = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    .Email-wrapper{
        display:grid;
        width: 50%;
        min-height: 50px;
        margin: 10px;
       
    }
    .Email-wrapper_log{
        justify-self: start;
        margin: 10px;
    }
    .Email-wrapper_button{
        background-color: #0094FF;
        width: 40%;
        color: white;
        padding: 10px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
    }
    .Email-wrapper_button:hover {
      cursor: pointer;
    }
    .Email-wrapper_body_message , .Email-wrapper_body_name{
    align-self: center; 
   margin-left: 25px;
   margin: 10px;
   color: gray;
    }
    .Email-wrapper_body_name{
     margin-bottom: 20px;
     margin: 10px;
    }
   #thanks{
        margin-top: 10px;
    }
    </style>
</head>
<body>
    <div class="Email-wrapper">
        <div class="Email-wrapper_log"><img src="https://res.cloudinary.com/dby88h516/image/upload/v1575884218/Group_13_hwi0ze.png" alt=""/></div>
        <div class="Email-wrapper_body">
            <div class="Email-wrapper_body_name">Hi ${userName}!</div>
            <div class="Email-wrapper_body_message">We are excited to have you onboard. Click the link below to activate your account and be able to travel the world with us.

            </br>  </br>  </br>  <span id="thanks" style="margin-top: 10px;">Pack your bags and let’s get you started.</span>  </div>
        </div>
       <a href="http://localhost:3000/api/v1/activate/${token}" class="Email-wrapper_button" style="cursor: pointer !important; justify-self: center; margin-left: 80px; text-decoration: none; color: white;">Activate Account</a>


    </div>
</body>
</html>`;

/**
 * This function helps to send email
 * @param {string} to this is a receiver email
 * @param {string} subject this is the subject of email to be send
 * @param {string} views this is html tages  that make body of email
 * @returns {null} return nothing
 */
function sendEmail(to, subject, views) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  /**
   * This is an object which include email data (mail option)
   */
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: views
  };

  transporter.sendMail(mailOptions);
}

sendEmail('shema.erc@gmail.com', 'greating', view);
