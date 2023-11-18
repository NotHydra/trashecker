import mongoose from "mongoose";

import { userSchema } from "./account/user";
import { userActivitySchema } from "./account/user-activity";

import { trashBinSchema } from "./trash/trash-bin";
import { trashBinActivitySchema } from "./trash/trash-bin-activity";
import { trashBinReportSchema } from "./trash/trash-bin-report";
import { trashBinReportResponseSchema } from "./trash/trash-bin-report-response";

const accountDatabase = mongoose.connection.useDb("account");
export const User = accountDatabase.model("user", userSchema, "user");
export const UserActivity = accountDatabase.model("activity", userActivitySchema, "activity");

const trashDatabase = mongoose.connection.useDb("trash");
export const TrashBin = accountDatabase.model("trash-bin", trashBinSchema, "trash-bin");
export const TrashBinActivity = accountDatabase.model("trash-bin-activity", trashBinActivitySchema, "trash-bin-activity");
export const TrashBinReport = accountDatabase.model("trash-bin-report", trashBinReportSchema, "trash-bin-report");
export const TrashBinReportResponse = accountDatabase.model("trash-bin-report-response", trashBinReportResponseSchema, "trash-bin-report-response");
