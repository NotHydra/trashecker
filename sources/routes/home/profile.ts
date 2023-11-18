import express, { Router } from "express";
import bcrypt from "bcrypt";

import { upperCaseFirst } from "../../utility";

import { app } from "../..";
import { headTitle } from ".";

import { User } from "../../models";

export const homeProfileRouter = Router();

const navActive = [1, 2];

homeProfileRouter.use(express.static("sources/public"));
homeProfileRouter.use(express.urlencoded({ extended: false }));

homeProfileRouter.get("/", async (req, res) => {
    const id = req.session.userId;

    let dataExist = null;
    dataExist = await User.exists({ _id: id }).lean();
    if (dataExist != null) {
        const itemObject = app.locals.userObject;

        let detailedInputArray: any = [];
        detailedInputArray = [
            {
                id: 1,
                name: "name",
                display: "Nama",
                type: "text",
                value: itemObject.name,
                placeholder: "Input nama disini",
                enable: false,
            },
            {
                id: 2,
                name: "username",
                display: "Username",
                type: "text",
                value: itemObject.username,
                placeholder: "Input username disini",
                enable: false,
            },
            {
                id: 3,
                name: "email",
                display: "Email",
                type: "email",
                value: itemObject.email,
                placeholder: "Input email disini",
                enable: false,
            },
            {
                id: 4,
                name: "role",
                display: "Role",
                type: "text",
                value: upperCaseFirst(itemObject.role),
                placeholder: "Input role disini",
                enable: false,
            },
            {
                id: 5,
                name: "status",
                display: "Status",
                type: "text",
                value: itemObject.status == true ? "Aktif" : "Tidak Aktif",
                placeholder: "Input status disini",
                enable: false,
            },
        ];

        res.render("pages/dashboard/profile/index", {
            headTitle,
            navActive,
            detailedInputArray,
        });
    } else if (dataExist == null) {
        res.redirect("/logout?type=exist");
    }
});

homeProfileRouter
    .route("/update")
    .get(async (req, res) => {
        const id = req.session.userId;

        let dataExist = null;
        dataExist = await User.exists({ _id: id }).lean();
        if (dataExist != null) {
            const itemObject = app.locals.userObject;

            let detailedInputArray: any = [];
            detailedInputArray = [
                {
                    id: 1,
                    name: "name",
                    display: "Nama",
                    type: "text",
                    value: itemObject.name,
                    placeholder: "Input nama disini",
                    enable: true,
                },
                {
                    id: 2,
                    name: "username",
                    display: "Username",
                    type: "text",
                    value: itemObject.username,
                    placeholder: "Input username disini",
                    enable: true,
                },
                {
                    id: 3,
                    name: "email",
                    display: "Email",
                    type: "email",
                    value: itemObject.email,
                    placeholder: "Input email disini",
                    enable: true,
                },
            ];

            res.render("pages/dashboard/profile/update", {
                headTitle,
                navActive,
                toastResponse: req.query.response,
                toastTitle: req.query.response == "success" ? "Data Berhasil Diubah" : "Data Gagal Diubah",
                toastText: req.query.text,
                detailedInputArray,
            });
        } else if (dataExist == null) {
            res.redirect("/logout?type=exist");
        }
    })
    .post(async (req, res) => {
        const id = req.session.userId;

        let dataExist = null;
        dataExist = await User.exists({ _id: id }).lean();
        if (dataExist != null) {
            let inputArray: any = [];
            inputArray = [req.body.name, req.body.username, req.body.email];

            if (!inputArray.includes(undefined)) {
                try {
                    await User.updateOne(
                        { _id: id },
                        {
                            username: req.body.username,
                            name: req.body.name,
                            email: req.body.email,

                            updatedAt: new Date(),
                        }
                    ).lean();

                    res.redirect("update?response=success");
                } catch (error: any) {
                    if (error.code == 11000) {
                        if (error.keyPattern.username) {
                            res.redirect("update?response=error&text=Username sudah digunakan");
                        } else if (error.keyPattern.email) {
                            res.redirect("update?response=error&text=Email sudah digunakan");
                        }
                    } else {
                        res.redirect("update?response=error");
                    }
                }
            } else if (inputArray.includes(undefined)) {
                res.redirect("update?response=error&text=Data tidak lengkap");
            }
        } else if (dataExist == null) {
            res.redirect("/logout?type=exist");
        }
    });

homeProfileRouter
    .route("/update-password")
    .get(async (req, res) => {
        const id = req.session.userId;
        const dataExist = await User.exists({ _id: id }).lean();

        if (dataExist != null) {
            res.render("pages/dashboard/profile/update-password", {
                headTitle,
                navActive,
                toastResponse: req.query.response,
                toastTitle: req.query.response == "success" ? "Password Berhasil Diubah" : "Password Gagal Diubah",
                toastText: req.query.text,
                detailedInputArray: [
                    {
                        id: 1,
                        name: "new_password",
                        display: "Password Baru",
                        type: "password",
                        value: null,
                        placeholder: "Input password baru disini",
                        enable: true,
                    },
                    {
                        id: 2,
                        name: "confirmation_password",
                        display: "Password Konfirmasi",
                        type: "password",
                        value: null,
                        placeholder: "Input password konfirmasi disini",
                        enable: true,
                    },
                ],
            });
        } else if (dataExist == null) {
            res.redirect("/logout?type=exist");
        }
    })
    .post(async (req, res) => {
        const id = req.session.userId;
        const dataExist = await User.exists({ _id: id }).lean();

        if (dataExist != null) {
            const inputArray: any = [req.body.new_password, req.body.confirmation_password];

            if (!inputArray.includes(undefined)) {
                if (req.body.new_password == req.body.confirmation_password) {
                    try {
                        await User.updateOne(
                            { _id: id },
                            {
                                password: await bcrypt.hash(req.body.new_password, 12),

                                updatedAt: new Date(),
                            }
                        ).lean();

                        res.redirect("update-password?response=success");
                    } catch (error: any) {
                        res.redirect("update-password?response=error");
                    }
                } else if (req.body.new_password != req.body.confirmation_password) {
                    res.redirect("update-password?response=error&text=Password konfirmasi salah");
                }
            } else if (inputArray.includes(undefined)) {
                res.redirect("update-password?response=error&text=Data tidak lengkap");
            }
        } else if (dataExist == null) {
            res.redirect("/logout?type=exist");
        }
    });
