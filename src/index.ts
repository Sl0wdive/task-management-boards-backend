import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import boarRoutes from "./routes/boardRoute";
import cardRoutes from "./routes/cardRoute";

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/boards", boarRoutes);
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
