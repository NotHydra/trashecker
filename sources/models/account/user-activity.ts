import mongoose from "mongoose";

export const userActivitySchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    idUser: {
        type: Number,
        required: true,
        ref: "user",
    },
    activity: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
