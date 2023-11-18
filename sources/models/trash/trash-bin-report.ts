import mongoose from "mongoose";

export const trashBinReportSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    idTrashBin: {
        type: Number,
        required: true,
        ref: "trash-bin",
    },
    identification: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
