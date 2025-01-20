import nodemailer from "nodemailer";
import { variablesEmail } from "../../utils/params/const.email.js";
import { responseEmail } from "../../common/enum/email/response.email.js";

var host_ = variablesEmail.host
var port_ = variablesEmail.port
var user_ = variablesEmail.user
var password_ = variablesEmail.password

const transporter = nodemailer.createTransport({
    host: host_,
    port: port_,
    auth: {
        user: `${user_}`,
        pass: `${password_}`
    }
});

async function mailApproved(name, username, password, email){
    const my = await transporter.sendMail({
        from: `D10+ <${user_}>`,
        to: `"${email}"`,
        subject: "Solicitud aprovada ⚽😁",
        html: `<div>Prueba</div>`,
    });

    return responseEmail.success({
        message: "Success send mail",
        messageId: my.messageId,
        mail: {
            from: my.envelope.from,
            to: my.envelope.to
        }
    });
}

async function mailRegister(name, username, password, email){
    const my = await transporter.sendMail({
        from: `Registro realizado <${user_}>`,
        to: `"${email}"`,
        subject: "Gracias por contactarme ⚽😉",
        html: ` <h4> Hola ${firstname}, espero estes bien.</h4>
            <h4> Gracias por contactarme desde mi portafolio, te responderé lo antes posible. 🫡</h4>`,
    });

    return responseEmail.success({
        message: "Success send mail",
        messageId: my.messageId,
        mail: {
            from: my.envelope.from,
            to: my.envelope.to
        }
    });
}

async function mailDenied(name, username, password, email){
    const my = await transporter.sendMail({
        from: `Email denegado <${user_}>`,
        to: `"${email}"`,
        subject: "Gracias por contactarme ⚽🫤",
        html: ` <h4> Hola ${firstname}, espero estes bien.</h4>
            <h4> Gracias por contactarme desde mi portafolio, te responderé lo antes posible. 🫡</h4>`,
    });

    return responseEmail.success({
        message: "Success send mail",
        messageId: my.messageId,
        mail: {
            from: my.envelope.from,
            to: my.envelope.to
        }
    });
}

async function main(name, username, password, email, type) {
    // send mail with defined transport object
    try {
        if(type == 'approved'){
            mailApproved(name, username, password, email)
        }else if(type == 'register'){
            mailRegister(name, username, password, email)
        }else if(type == 'denied'){
            mailDenied(name, username, password, email)
        }
    } catch (error) {
        return responseEmail.success({
            message: "Error send mail",
            data: []
        });
    }
}


export const sendEmail = async (req, res) => {
    const { name, username, password, email, type } = req.body
    const send = await main(name, username, password, email, type)
    res.send(send)
}
