import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.listen(process.env.PORT);