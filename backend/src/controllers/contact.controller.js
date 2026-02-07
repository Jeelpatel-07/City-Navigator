const ContactMessage = require("../models/ContactMessage.model");
const sendEmail = require("../utils/sendEmail");

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Save to MongoDB
    await ContactMessage.create({
      name,
      email,
      message
    });

    // 3. Send email to admin
    await sendEmail(
      "citynavigator1034@gmail.com",
      "📩 New Contact Message - City Navigator",
      `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    );

    res.status(200).json({
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
