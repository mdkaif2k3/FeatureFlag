import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import organizationRoutes from "./routes/organizationRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/organizations", organizationRoutes)

app.get("/", (req, res) => {
    res.send("Backend is running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})