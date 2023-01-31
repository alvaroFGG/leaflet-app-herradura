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

const updateWaypoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, description, location, type } = req.body;
  const waypoint = await WaypointModel.findByIdAndUpdate(id, {
    name,
    description,
    location,
    type,
  });
  res.status(200).json(waypoint);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  ProviderDatabase.init();

  switch (req.method) {
    case "GET":
      await getWaypoints(res);
      break;
    case "POST":
      await createWaypoint(req, res);
      break;
    case "PUT":
      await updateWaypoint(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
};
