import mongoose from "mongoose";

import { userSchema } from "./account/user";
import { activitySchema } from "./account/activity";

const accountDatabase = mongoose.connection.useDb("account");
export const User = accountDatabase.model("user", userSchema, "user");
export const Activity = accountDatabase.model("activity", activitySchema, "activity");
