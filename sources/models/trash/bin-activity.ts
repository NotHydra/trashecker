import mongoose from "mongoose";

export const binActivitySchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    idBin: {
        type: Number,
        required: true,
        ref: "bin",
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
