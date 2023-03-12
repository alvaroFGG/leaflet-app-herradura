import { EMarkerType } from "@/types/enums";
import { Schema, model } from "mongoose";

const WaypointSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: [Number], required: true },
  type: { type: String, enum: Object.values(EMarkerType), required: true },
});

export const WaypointModel = model("Waypoint", WaypointSchema, "waypoints");
