import mongoose from "mongoose";

export const binActivitySchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    idTrashBin: {
        type: Number,
        required: true,
        ref: "trash-bin",
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
