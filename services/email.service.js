const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noty.apps@gmail.com',
      pass: 'Os@0505641680'
    },
    // tls: { rejectUnauthorized: false }
  });

module.exports = {
    sendEmail(to, title, html) {
      try {
        var mailOptions = {
          from: 'noty.apps@gmail.com',
          to: to,
          subject: title,
          html: html
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            // console.log('Email sent: ' + info.response);
          }
        });
        transporter.close()
      }
      catch(e) {
        console.log(e)
      }
    }

}