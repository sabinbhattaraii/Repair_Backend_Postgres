import { fromEmail } from "../config/sconfig.js";
import { sendMail } from "../utils/sendMail.js";

export const sendEmailForCreatedUser = async ({
  email,
  name,
  password,
}) => {
  const html = `
        <div style="background: lightgray; padding: 20px; margin: 30px;">
        <div style="background: #fff; padding: 20px">
          <br><br>
          <div><h3 Dear Mr./Mrs. ${name},</h3>
          <p>You have been successfully registered as user</p>
          <p>You will be contacted within 5 business days to update you about the further booking process and other related details</p>
          <p>Your registration details are as follows.</p>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Password : ${password}</p>
          </div>
          <div style="text-align:center; margin-top: 15px;">    
      </div>
        `;

  await sendMail({
    from: `Hello Repair <${fromEmail}>`,
    to: [email],
    subject: "Email verification for User Creation",
    html:html,
  });
};

export const sendEmailToForgotPassword = async ({
  email,
  token,
  name,
}) => {
  let link = `http://localhost:5000/resetPassword/?token=${token}`;
  const html = `
  <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${name}, <br>
      To reset your password, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Reset Password</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
    </div>

  </div>
`;

  await sendMail({
    from: `"Hello Repair" <${fromEmail}>`,
    to: [email],
    subject: "Forgot Password",
    html
  });
}