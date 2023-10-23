import { Request, Response } from "express";
import { sendMailer, sendMailerCandidate } from "../services/email";

export const serndEmailServiceOffice = async (req: Request, res: Response) => {
    const {
        emailFrom,
        emailTo,
        message,
        cc,
        subject,
        html,
        filename64,
        content64,
    } = req.body;

    if (!emailFrom) {
        return res.status(422).json({
            message: "Identifique-se ao menos.",
        });
    }
    if (!emailTo) {
        return res.status(422).json({
            message: "Insira o email para quem deseja enviar.",
        });
    }

    if (!message) {
        return res.status(422).json({
            message: "Insira ao menos uma mensagem",
        });
    }
    if (!subject) {
        return res.status(422).json({
            message: "Insira ao menos um assunto",
        });
    }

    const sent = {
        emailFrom,
        emailTo,
        message,
        cc: cc ? cc : [""],
        subject,
        html,
        filename64,
        content64,
    };

    console.log(sent)

    try {
        const send = await sendMailer(
            sent.emailFrom,
            sent.emailTo,
            sent.message,
            sent.cc,
            sent.subject,
            `${sent.html}`,
            sent.filename64,
            sent.content64
        );
        res.status(200).json({ message: `E-mail enviado com sucesso!`, i: send.envelope })
        return send;
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const serndEmailServiceCandidate = async (
    req: Request,
    res: Response
) => {
    const { emailFrom, emailTo, message, cc, subject, html } = req.body;

    if (!subject) {
        return res.status(422).json({
            message: "Por favor, insira ao menos um assunto.",
        });
    }

    if (!emailFrom) {
        return res.status(422).json({
            message: "Identifique-se ao menos.",
        });
    }
    if (!emailTo) {
        return res.status(422).json({
            message: "Insira o email para quem deseja enviar.",
        });
    }

    if (!message) {
        return res.status(422).json({
            message: "Insira ao menos uma mensagem",
        });
    }

    const sent = {
        subject,
        emailFrom,
        message,
        emailTo,
        cc: cc ? cc : [""],
        html,
    };

    try {
         sendMailerCandidate(
            sent.subject,
            sent.emailFrom,
            sent.message,
            sent.emailTo,
            sent.cc,
            `${sent.html}`
        );

        return res.status(200).json({ message: `E-mail enviado com sucesso!` });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
