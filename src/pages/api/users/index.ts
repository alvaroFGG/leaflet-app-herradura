import { UserModel } from "@/backend/models/user";
import ProviderDatabase from "@/backend/providers/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const getUsers = async (res: NextApiResponse) => {
  const users = await UserModel.find({});

  res.status(200).json(users);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

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

  if (req.method === "GET") {
    await getUsers(res);
  }

  if (req.method === "POST") {
    await createUser(req, res);
  }
};

export default createEndpoints;
