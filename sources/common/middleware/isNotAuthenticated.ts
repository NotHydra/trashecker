import { NextFunction, Request, Response } from "express";

export function isNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!(req.session.userId && req.session.userType)) {
        next();
    } else if (req.session.userId && req.session.userType) {
        res.redirect("/");
    }
}
