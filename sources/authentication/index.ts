import { Router } from "express";

import { authenticationLoginRouter } from "./login";
import { authenticationLogoutRouter } from "./logout";

export const authenticationRouter = Router();

authenticationRouter.use("/login", authenticationLoginRouter);
authenticationRouter.use("/logout", authenticationLogoutRouter);
