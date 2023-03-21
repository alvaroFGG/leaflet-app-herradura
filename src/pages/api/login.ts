//login
import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "@/backend/models/user";
import ProviderDatabase from "@/backend/providers/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "@/backend/models/interfaces";

const SALT = 10;

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = UserModel.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
};

const createEndpoints = async (req: NextApiRequest, res: NextApiResponse) => {
  ProviderDatabase.init();

  if (req.method === "POST") {
    await login(req, res);
  }
};
