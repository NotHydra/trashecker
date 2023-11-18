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

binTrashRouter
    .route("/create")
    .get(async (req, res) => {
        res.render("pages/create", {
            headTitle,
            navActive,
            toastResponse: req.query.response,
            toastTitle: req.query.response == "success" ? "Data Berhasil Dibuat" : "Data Gagal Dibuat",
            toastText: req.query.text,
            detailedInputArray: [
                {
                    id: 1,
                    name: "name",
                    display: "Nama",
                    type: "text",
                    value: null,
                    placeholder: "Input nama disini",
                    enable: true,
                },
                {
                    id: 2,
                    name: "location",
                    display: "Lokasi",
                    type: "text",
                    value: null,
                    placeholder: "Input lokasi disini",
                    enable: true,
                },
            ],
        });
    })
    .post(async (req, res) => {
        if (![req.body.name, req.body.location].includes(undefined)) {
            const itemObject = new Bin({
                _id: (await Bin.findOne().select("_id").sort({ _id: -1 }).lean())?._id + 1 || 1,
                name: req.body.name,
                location: req.body.location,
                status: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            try {
                await itemObject.save();
                res.redirect("create?response=success");
            } catch (error: any) {
                res.redirect("create?response=error");
            }
        } else {
            res.redirect("create?response=error&text=Data tidak lengkap");
        }
    });
