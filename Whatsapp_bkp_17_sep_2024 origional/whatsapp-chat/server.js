/* eslint-disable no-undef */
// import express from 'express';
// import bodyParser from 'body-parser';
// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = import.meta.env.PORT || 3001;

// // Twilio credentials from environment variables
// const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
// const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// app.use(bodyParser.json());

// app.post('/send-whatsapp', (req, res) => {
//   const { message } = req.body;
//   client.messages
//     .create({
//       body: message,
//       from: 'whatsapp:+15415323788', 
//       to: 'whatsapp:+916394294581',
//     })
//     .then(message => res.status(200).send({ sid: message.sid }))
//     .catch(error => res.status(500).send({ error: error.message }));
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// import express from 'express';
// import bodyParser from 'body-parser';
// import twilio from 'twilio';
// import dotenv from 'dotenv';
// import cors from 'cors';
// dotenv.config();

// const app = express();
// const port = 3001;

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(cors({ origin: 'http://localhost:5173' }));
// const corsOptions = {
//     origin: 'http://localhost:5173', 
//   };
//   let messagesStore = [];

// app.use(cors(corsOptions)); 

// app.post('/send-whatsapp', (req, res) => {
//     const { message } = req.body;
  
//     if (!message) {
//       return res.status(400).send({ error: 'Message body is required.' });
//     }
  
//     client.messages
//       .create({
//         body: message,
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+916394294581',
//       })
//       .then(message => res.status(200).send({ sid: message.sid }))
//       .catch(error => res.status(500).send({ error: error.message }));
//   });
  
//   // Endpoint to receive incoming messages from Twilio
//   app.post('/receive-whatsapp', (req, res) => {
//     const { Body, From } = req.body;
  
//     if (From === 'whatsapp:+916394294581') {  // Adjust this to the expected sender number
//       messagesStore.push({ text: Body, type: 'bot' });
//     }
  
//     res.sendStatus(200);
//   });
  
//   // Endpoint to get stored messages
//   app.get('/get-messages', (req, res) => {
//     res.json({ messages: messagesStore });
//     console.log("Hee", messages)
//   });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
