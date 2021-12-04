const nodemailer = require("nodemailer");

const transporter=  nodemailer.createTransport(
{

    service: "gmail",
    auth: {
        user: "soungoo123@gmail.com",
        pass: "Yinthu@3",
    },
});

module.exports = transporter;




