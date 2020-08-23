import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import sendgrid from "@sendgrid/mail";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

sendgrid.setApiKey(process.env.GRIDMAIL);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const { name, email, textArea } = req.body;

  try {
    await sendgrid.send({
      to: "uriboros15@gmail.com",
      from: email,
      subject: `Nova mensagem de ${name}`,
      text: textArea,
      html: `<p>${textArea}</p>`,
    });
    return res.status(200).json({ msg: "Thanks for your message!" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
