import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const resolvePort = () => {
  const rawPort = process.env.PORT;
  if (!rawPort) return 5000;

  const parsed = Number.parseInt(rawPort, 10);
  return Number.isNaN(parsed) ? 5000 : parsed;
};

const PORT = resolvePort();

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
