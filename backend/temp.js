import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'popri.confirmation@gmail.com',
        pass: 'ubgpbmhdfmcpigjn'
    }
});

send();

async function send() {
    const result = await transporter.sendMail({
        from: 'popri.confirmation@gmail.com',
        to: 'popatritik2012@gmail.com',
        subject: 'Hello World',
        text: 'Hello World'
    });

    console.log(JSON.stringify(result, null, 4));
}
