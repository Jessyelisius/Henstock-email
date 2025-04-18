const EmailDetailsModel = require("../model/EmailDetails.model");
const { Sendmail } = require("../utils/mailer");

const sendEmail = async(req, res) => {
    try {
        const {Subject, Body, recipientEmail} = req.body;
        const many = recipientEmail.length>1;

        const sendResult = await Sendmail(
            many ? recipientEmail : recipientEmail[0],
            Subject,
            emailTemplate(Body),  //wraps the user input with design
            many
        );

        if (sendResult.error) {
            return res.status(500).json({ error: sendResult.error });
          }

        await EmailDetailsModel.create({
            Subject,
            Body,
            recipientEmail,
            sendAt:new Date()
        });
        
        return res.status(200).json({ message: "Email sent and saved!" });
    } catch (error) {
        console.log('error sending mail', error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = sendEmail;