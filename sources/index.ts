import express, { Express } from "express";
import session from "express-session";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import path from "path";

import { mongoDBURI, pageItemArray, sessionSecret } from "./depedency";
import { findPageItem, findPageItemChild, localMoment, upperCaseFirst, zeroPad } from "./utility";

import { roleCheck, roleConvert, roleGuard } from "./authentication/guard/role.guard";
import { isAuthenticated } from "./common/middleware/isAuthenticated";
import { isActive } from "./common/middleware/isActive";
import { sessionData } from "./common/middleware/sessionData";
import { requestCounter } from "./common/middleware/requestCounter";

import { authenticationRouter } from "./authentication";
import { homeRouter } from "./routes/home";
// import { accountRouter } from "./routes/account";

declare module "express-session" {
    interface Session {
        userId: number;
    }
}

export const app: Express = express();
const port: any = process.env.PORT || 3000;

app.locals.moment = localMoment;
app.locals.pageItemArray = pageItemArray;

app.locals.roleConvert = roleConvert;
app.locals.roleCheck = roleCheck;
app.locals.findPageItem = findPageItem;
app.locals.findPageItemChild = findPageItemChild;
app.locals.zeroPad = zeroPad;
app.locals.upperCaseFirst = upperCaseFirst;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 },
    })
);

app.use(authenticationRouter);

app.use(isAuthenticated);
app.use(isActive);
app.use(sessionData);
app.use(requestCounter);

app.use(roleGuard(1));
app.use("/", homeRouter);

app.use(roleGuard(2));
// app.use("/account", accountRouter);
app.use(require("express-status-monitor")());

app.use((req, res) => {
    res.redirect("/");
});

mongoose.connect(mongoDBURI, async () => {
    console.log("Connected to database");

    app.locals.applicationName = "Trashecker";
    app.listen(port, async () => {
        console.log(`Listening on http://localhost:${port}`);
    });
});
