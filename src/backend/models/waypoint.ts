import mongoose, { Schema, model } from 'mongoose';


const WaypointSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: number[], required: true },