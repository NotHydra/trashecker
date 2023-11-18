import express, { Router } from "express";
import bcrypt from "bcrypt";

import { isNotAuthenticated } from "../common/middleware/isNotAuthenticated";

import { User } from "../models";

export const authenticationLoginRouter = Router();
const headTitle = "Login";

authenticationLoginRouter.use(express.static("sources/public"));
authenticationLoginRouter.use(express.urlencoded({ extended: false }));

authenticationLoginRouter.use(isNotAuthenticated);

authenticationLoginRouter
    .route("/")
    .get(async (req, res) => {
        const typeValue = req.query.type;

        let toastTitle;

        if (typeValue == "login") {
            toastTitle = "Login gagal";
        } else if (typeValue == "logout") {
            toastTitle = "Logout berhasil";
        } else if (typeValue == "exist") {
            toastTitle = "Akun tidak valid";
        } else if (typeValue == "active") {
            toastTitle = "Akun tidak aktif";
        }

        res.render("pages/authentication/login", {
            headTitle,
            toastResponse: req.query.response,
            toastTitle,
            toastText: req.query.text,
        });
    })
    .post(async (req, res) => {
        const userObject: any = await User.findOne({ username: req.body.username }).select("username password status").lean();

        if (userObject != null) {
            const passwordIsValid = await bcrypt.compare(req.body.password, userObject.password);

            if (passwordIsValid) {
                if (userObject.status) {
                    req.session.regenerate(() => {
                        req.session.userId = userObject._id;

                        req.session.save(() => {
                            res.redirect("/?response=success");
                        });
                    });
                } else if (!userObject.status) {
                    res.redirect("/login?type=login&response=error&text=Akun belum aktif");
                }
            } else if (!passwordIsValid) {
                res.redirect("/login?type=login&response=error&text=Username atau password salah");
            }
        } else if (userObject == null) {
            res.redirect("/login?type=login&response=error&text=Username atau password salah");
        }
    });
