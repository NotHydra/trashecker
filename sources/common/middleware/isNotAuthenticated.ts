import { NextFunction, Request, Response } from "express";

export function isNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        next();
    } else if (req.session.userId) {
        res.redirect("/");
    }
}
