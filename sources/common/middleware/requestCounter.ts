import { NextFunction, Request, Response } from "express";

import { UserActivity } from "../../models";

export async function requestCounter(req: Request, res: Response, next: NextFunction) {
    res.on("finish", async () => {
        if (!req.originalUrl.includes("dist") && !req.originalUrl.includes("plugins") && !req.originalUrl.includes("css")) {
            const itemObject = new UserActivity({
                _id: (await UserActivity.findOne().select("_id").sort({ _id: -1 }).lean())?._id + 1 || 1,

                idUser: req.session.userId,
                activity: req.originalUrl,
                createdAt: new Date(),
            });

            try {
                await itemObject.save();
            } catch (error: any) {}
        }
    });

    next();
}
