import { NextFunction, Request, Response } from "express";

import { app } from "../..";

import { upperCaseFirst } from "../../utility";

import { User } from "../../models";

export async function sessionData(req: Request, res: Response, next: NextFunction) {
    let userObject: any = null;

    userObject = await User.findOne({ _id: req.session.userId }).lean();

    userObject.nameDisplay = userObject.name;
    userObject.usernameDisplay = userObject.username;
    userObject.roleDisplay = upperCaseFirst(userObject.role);

    if (userObject != null) {
        app.locals.userType = req.session.userType;
        app.locals.userObject = userObject;

        next();
    } else if (userObject == null) {
        res.redirect("/logout?type=exist");
    }
}
