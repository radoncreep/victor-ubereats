import express from "express";

const app = express();

app.use(express.json());

const PORT = 1333;

app.listen(PORT, () => console.log(`Auth service running on ${PORT}`));