import express, { Router } from "express";

import { headTitle } from ".";

import { UserActivity, User } from "../../models";
import {} from "../../utility";

export const accountActivityRouter = Router();

const navActive = [2, 3];
const tableAttributeArray = [
    {
        id: 1,
        label: "Username",
        value: ["idUser", "username"],
        type: "text",
    },
    {
        id: 2,
        label: "Activity",
        value: ["activity"],
        type: "text",
    },
];

accountActivityRouter.use(express.static("sources/public"));
accountActivityRouter.use(express.urlencoded({ extended: false }));

accountActivityRouter.route("/").get(async (req, res) => {
    const typeValue: any = req.query.type;
    const userValue: any = req.query.user;

    const methodValue: any = req.query.method;
    let filterValue = {};

    if (methodValue != undefined && isNaN(methodValue)) {
        filterValue = { ...filterValue, method: methodValue };
    }

    let tableItemArray: any = await UserActivity.find(filterValue).populate({ path: "idUser", select: "username", model: User }).sort({ createdAt: -1 }).lean();

    if (userValue != undefined && !isNaN(userValue)) {
        tableItemArray = tableItemArray.filter((tableItemObject: any) => {
            if (tableItemObject.idUser._id == userValue) {
                return tableItemObject;
            }
        });
    }

    const documentCount = await UserActivity.countDocuments().lean();

    res.render("pages/account/activity/table", {
        headTitle,
        navActive,
        toastResponse: req.query.response,
        toastTitle: req.query.response == "success" ? "Berhasil" : "Gagal",
        toastText: req.query.text,
        cardItemArray: [
            {
                id: 1,
                cardItemChild: [
                    {
                        id: 1,
                        title: "Aktivitas",
                        icon: "eye",
                        value: documentCount,
                    },
                ],
            },
            {
                id: 2,
                cardItemChild: [
                    {
                        id: 1,
                        title: "Dibuat",
                        icon: "circle-plus",
                        value:
                            documentCount >= 1
                                ? (
                                      (await UserActivity.findOne()
                                          .select("idUser")
                                          .populate({ path: "idUser", select: "username", model: User })
                                          .sort({ createdAt: -1 })
                                          .lean()) as any
                                  ).idUser.username
                                : "Tidak Ada",
                    },
                ],
            },
        ],
        filterArray: [
            {
                id: 1,
                display: "User",
                name: "user",
                query: "user",
                placeholder: "Pilih user",
                value: userValue,
                option: (await User.find().select("username").sort({ username: 1 }).lean()).map((itemObject: any) => {
                    return {
                        value: itemObject._id,
                        display: itemObject.username,
                    };
                }),
            },
        ],
        tableAttributeArray,
        tableItemArray,
        typeValue,
        userValue,
    });
});
