const EmailDetailsModel = require("../model/EmailDetails.model");
const { Sendmail, emailTemplate } = require("../utils/mailer");

const sendEmail = async(req, res) => {
    try {
        const {Subject, Body, recipientEmail} = req.body;
        const many = recipientEmail.length>1;

        if (!Subject || !Body || !recipientEmail) {
            return res.status(400).render('emailForm',{ error: "All fields are required." });
          }

        const sendResult = await Sendmail(
            many ? recipientEmail : recipientEmail[0],
            Subject,
            emailTemplate(Body),  //wraps the user input with design
            many,
        );

        if (sendResult.error) {
            return res.status(500).render('emailForm',{ error: sendResult.error });
          }

        await EmailDetailsModel.create({
            Subject,
            Body,
            recipientEmail,
            SentAt:new Date()
        });
        
        return res.status(200).render('emailForm',{ message: "Email sent and saved!" });
    } catch (error) {
        console.log('error sending mail', error);
        return res.status(500).render('emailForm',{ error: error.message });
    }
}

const viewMail = async (req, res) => {
    try {
        const emails = await EmailDetailsModel.find().sort({ SentAt: -1 });

        if (!emails || emails.length === 0) {
            return res.render('viewMail', { error: "No email records found", emails: [] });
        }

        res.render('viewMail', { emails, error: null });
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).render('viewMail', { error: "Server error occurred", emails: [] });
    }
};

module.exports = {sendEmail, viewMail};