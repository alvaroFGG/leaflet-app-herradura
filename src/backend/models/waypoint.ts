import { Schema, model } from "mongoose";

const WaypointSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: [Number], required: false },
  type: { type: String, required: true },
});

export const WaypointModel = model("Waypoint", WaypointSchema, "waypoints");
