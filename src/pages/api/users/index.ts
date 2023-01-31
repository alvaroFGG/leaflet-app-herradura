import { UserModel } from "@/backend/models/user";
import ProviderDatabase from "@/backend/providers/database";
import { NextApiRequest, NextApiResponse } from "next";

const getUsers = async (res: NextApiResponse) => {
  const users = await UserModel.find({});

  res.status(200).json(users);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });
  res.status(200).json(user);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  ProviderDatabase.init();

  if (req.method === "GET") {
    await getUsers(res);
  }

  if (req.method === "POST") {
    await createUser(req, res);
  }
};
