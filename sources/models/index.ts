import mongoose from "mongoose";

import { userSchema } from "./account/user";
import { userActivitySchema } from "./account/user-activity";

import { binSchema as binSchema } from "./trash/bin";
import { binActivitySchema as binActivitySchema } from "./trash/bin-activity";
import { binReportSchema as binReportSchema } from "./trash/bin-report";
import { binReportResponseSchema as binReportResponseSchema } from "./trash/bin-report-response";

const accountDatabase = mongoose.connection.useDb("account");
export const User = accountDatabase.model("user", userSchema, "user");
export const UserActivity = accountDatabase.model("activity", userActivitySchema, "activity");

const trashDatabase = mongoose.connection.useDb("trash");
export const Bin = trashDatabase.model("bin", binSchema, "bin");
export const BinActivity = trashDatabase.model("bin-activity", binActivitySchema, "bin-activity");
export const BinReport = trashDatabase.model("bin-report", binReportSchema, "bin-report");
export const BinReportResponse = trashDatabase.model("bin-report-response", binReportResponseSchema, "bin-report-response");
