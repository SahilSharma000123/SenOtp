const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC76de78a8196929a4851cd598567dc6e6';
const authToken = 'dabeea11b45c56043e0b417be0d2df51';
const client = require('twilio')(accountSid, authToken);

app.use(express.urlencoded({extended: true}));


app.use("/", express.static(path.join(__dirname + "/public")));

var fileData = fs.readFile('/Users/anil/Documents/HtmlFolder/SendOtp/public/contactlist.json', (err, data) => {
    if (err) throw err;

    fileData = data;
    // console.log(data.toJSON());

});


app.get("/getJson", (req, res) => {

    res.send(fileData);
});
let contactList = [];
app.post('/sendOtp', (req, res) => {
    contactList.push((req.body.message).split("\n"));
    res.send('Working');

    let otp = '';
    for (let i = 0; i < contactList[0].length - 1; i++) {
        otp = generateotp();
        console.log(contactList[0][i])

        client.messages
            .create({
                body: 'Your One Time Password is ' + otp,
                from: '+12063300458',
                statusCallback: 'http://postb.in/1234abcd',
                to: '+91' + contactList[0][i]
            })
            .then(message => console.log(message.sid)).catch((err) => {
            console.log(err.message);
        });
    }
});


function generateotp() {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


app.listen(9990, () => {
    console.log('server is running');
});