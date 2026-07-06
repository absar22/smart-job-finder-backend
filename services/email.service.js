const { Resend } = require("resend")
const resend = new Resend(process.env.RESEND_API_KEY)
 
exports.sendPasswordResetEmail = async (options) => {
  try {
    if(!options.email || !options.subject || !options.message) {
      throw new Error("Missing required email fields");
    }
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: options.email,
       subject: options.subject,
        text: options.message,
    });
   console.log(options.email, "Email sent successfully");
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
};  