import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
