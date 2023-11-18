import mongoose from "mongoose";

export const trashBinReportResponseSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    idTrashBinReport: {
        type: Number,
        required: true,
        ref: "trash-bin-report",
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
