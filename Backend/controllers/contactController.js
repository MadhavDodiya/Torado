import Contact from "../models/Contact.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "name, email and message are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Contact request saved successfully",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
};
