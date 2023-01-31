import { WaypointModel } from "@/backend/models/waypoint";
import ProviderDatabase from "@/backend/providers/database";
import { NextApiRequest, NextApiResponse } from "next";

const getWaypoints = async (res: NextApiResponse) => {
  const waypoints = await WaypointModel.find({});

  res.status(200).json(waypoints);
};

const createWaypoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, location, type } = req.body;
  const waypoint = await WaypointModel.create({
    name,
    description,
    location,
    type,
  });
  res.status(200).json(waypoint);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  ProviderDatabase.init();

  if (req.method === "GET") {
    await getWaypoints(res);
  }

  if (req.method === "POST") {
    await createWaypoint(req, res);
  }
};
