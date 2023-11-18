import { Router } from "express";

import { isAuthenticated } from "../common/middleware/isAuthenticated";

export const authenticationLogoutRouter = Router();

authenticationLogoutRouter.use(isAuthenticated);

authenticationLogoutRouter.route("/").get(async (req, res) => {
    req.session.userId = undefined;

    req.session.save(() => {
        req.session.regenerate(() => {
            const typeValue = req.query.type;

            if (typeValue == undefined) {
                res.redirect("/login?type=logout&response=success");
            } else if (typeValue == "exist") {
                res.redirect("/login?type=exist&response=error");
            } else if (typeValue == "active") {
                res.redirect("/login?type=active&response=error");
            }
        });
    });
});
