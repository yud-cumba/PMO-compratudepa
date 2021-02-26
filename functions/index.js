const functions = require('firebase-functions');
require('dotenv').config();
// const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// admin.initializeApp();
// const db = admin.database();
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

exports.sendEmailLeads = functions.database
  .ref('/LEADS/{uid}')
  .onCreate((snap) => {
    const val = snap.val();
    const transport = {
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    const data = {
      from: EMAIL,
      to: `${val.email}`,
      subject: 'SOLICITACIÓN DE COTIZACIÓN',
      html: `<html>
              <p>
              Hola ${val.name} ¡Muchas gracias por iniciar tu proceso con nosotros! Nos estaremos comunicando contigo para enviar mayor información</p>
              </br>
              <p> Saludos </p>
              </br>
              <p>COMPRATUDEPA</p>
            </html>`,
    };
    const transporter = nodemailer.createTransport(transport);
    transporter
      .sendMail(data)
      .then(() => console.log('Correo enviado exitosamente'))
      .catch((err) => console.log(err));
  });
