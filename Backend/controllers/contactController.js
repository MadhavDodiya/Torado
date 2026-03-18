import Contact from "../models/Contact.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedMessage = typeof message === "string" ? message.trim() : "";

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return res
        .status(400)
        .json({ message: "name, email and message are required" });
    }

    const contact = await Contact.create({
      name: normalizedName,
      email: normalizedEmail,
      phone: typeof phone === "string" ? phone.trim() : "",
      subject: typeof subject === "string" ? subject.trim() : "",
      message: normalizedMessage,
    });

    return res.status(201).json({
      message: "Contact request saved successfully",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
};
