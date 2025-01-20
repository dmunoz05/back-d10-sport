import nodemailer from "nodemailer";
import { variablesEmail } from "../../utils/params/const.email.js";
import { responseEmail } from "../../common/enum/email/response.email.js";
import { htmlTemplateApproved } from "../../ui/template/approve/index.js";
import { htmlTemplateDenied } from "../../ui/template/denied/index.js";
import { htmlTemplateRegister } from "../../ui/template/register/index.js";

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

async function mailApproved(name, username, password, email) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Solicitud aprobada ⚽😁",
            html: htmlTemplateApproved(name, username, password),
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function mailRegister(name, email) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Registro realizado ⚽😉",
            html: htmlTemplateRegister(name)
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function mailDenied(name, email) {
    try {
        const my = await transporter.sendMail({
            from: `D10+ Academy <${user_}>`,
            to: `"${email}"`,
            subject: "Registro denegado ⚽🫤",
            html: htmlTemplateDenied(name)
        });

        return responseEmail.success({
            message: "Success send mail",
            messageId: my.messageId,
            mail: {
                from: my.envelope.from,
                to: my.envelope.to
            }
        });
    } catch (error) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
}

async function main(name, username, password, email, type) {
    let response;
    if (type == 'approved') {
        response = await mailApproved(name, username, password, email)
    } else if (type == 'register') {
        response = await mailRegister(name, email)
    } else if (type == 'denied') {
        response = await mailDenied(name, email)
    } else if (type == undefined || type == null) {
        return responseEmail.error({
            message: "Error send mail",
            data: []
        });
    }
    return responseEmail.success({
        message: response.message,
        messageId: response.messageId,
        mail: response.mail
    });
}

export const sendEmailFunction = async (data) => {
    const { name, username, password, email, type } = data
    const send = await main(name, username, password, email, type)
    return send
}

export const sendEmail = async (req, res) => {
    const { name, username, password, email, type } = req.body
    const send = await main(name, username, password, email, type)
    res.send(send)
}
