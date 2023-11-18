import express, { Router } from "express";
import bcrypt from "bcrypt";

import { app } from "../..";
import { headTitle } from ".";

import { Bin, BinActivity } from "../../models";
import { localMoment, upperCaseFirst } from "../../utility";
import { roleCheck, roleConvert } from "../../authentication/guard/role.guard";

const navActive = [3, 2];
export const binTrashRouter = Router();

binTrashRouter.use(express.static("sources/public"));
binTrashRouter.use(express.urlencoded({ extended: true }));

binTrashRouter.route("/").get(async (req, res) => {
    const statusValue: any = req.query.status;
    let filterValue = {};

    if (statusValue != undefined) {
        filterValue = { ...filterValue, status: statusValue };
    }

    let tableItemArray: any = await Bin.find(filterValue).sort({ name: 1 }).lean();
    const activityArray = await BinActivity.find().select({ idBin: true, createdAt: true }).sort({ createdAt: -1 }).lean();

    tableItemArray = await Promise.all(
        tableItemArray.map(async (tableItemObject: any) => {
            const activityObject = activityArray.find((activityObject) => {
                if (activityObject.idBin == tableItemObject._id) {
                    return activityObject;
                }
            });

            tableItemObject.activity = activityObject == undefined ? "Tidak Ada" : upperCaseFirst(localMoment(activityObject.createdAt).fromNow());

            return tableItemObject;
        })
    );

    res.render("pages/trash/bin/table", {
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
                        title: "Tempat Pembuangan",
                        icon: "dumpster",
                        value: await Bin.countDocuments().lean(),
                    },
                    {
                        id: 2,
                        title: "Penuh",
                        icon: "circle-plus",
                        value: await Bin.countDocuments({ status: true }).lean(),
                    },
                    {
                        id: 3,
                        title: "Kosong",
                        icon: "circle-minus",
                        value: await Bin.countDocuments({ status: false }).lean(),
                    },
                ],
            },
        ],
        filterArray: [
            {
                id: 1,
                display: "Status",
                name: "status",
                query: "status",
                placeholder: "Pilih status",
                value: statusValue,
                option: [
                    {
                        value: "true",
                        display: "Penuh",
                    },
                    {
                        value: "false",
                        display: "Kosong",
                    },
                ],
            },
        ],
        tableItemArray: tableItemArray,
    });
});
