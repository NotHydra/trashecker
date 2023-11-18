import { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // req.session.userId = 1;
    // req.session.userType = "user";

    if (req.session.userId && req.session.userType) {
        next();
    } else if (!(req.session.userId && req.session.userType)) {
        res.redirect("/login");
    }
}
