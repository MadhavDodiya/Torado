const getAdminEmailList = () => {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

const isAdminEmail = (email = "") => {
  const adminEmails = getAdminEmailList();
  return adminEmails.includes(email.trim().toLowerCase());
};

export default isAdminEmail;
