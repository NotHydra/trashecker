import { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    req.session.userId = 1;

    if (req.session.userId) {
        next();
    } else if (!req.session.userId) {
        res.redirect("/login");
    }
}
