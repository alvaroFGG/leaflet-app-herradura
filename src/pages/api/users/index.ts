import { UserModel } from "@/backend/models/user";
import ProviderDatabase from "@/backend/providers/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const SALT = 10;

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } = req.body;

  const encryptedPassword = await bcrypt.hash(password, SALT);

  const user = new UserModel({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  await user.save();

  res.status(200).json(user);
};

const createEndpoints = async (req: NextApiRequest, res: NextApiResponse) => {
  ProviderDatabase.init();

  if (req.method === "POST") {
    await createUser(req, res);
  }
};

export default createEndpoints;
