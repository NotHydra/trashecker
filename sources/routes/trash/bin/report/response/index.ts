import express, { Router } from "express";

import { headTitle } from "../../..";

import { Bin, BinActivity, BinReport, BinReportResponse } from "../../../../../models";
import { localMoment, upperCaseFirst } from "../../../../../utility";

const navActive = [3, 2];
export const responseReportBinTrashRouter = Router();

responseReportBinTrashRouter.use(express.static("sources/public"));
responseReportBinTrashRouter.use(express.urlencoded({ extended: true }));

responseReportBinTrashRouter.route("/").get(async (req, res) => {
    const id = req.query.id;
    const idBin = req.query.idBin;

    let tableItemArray: any = await BinReportResponse.find({ idBinReport: id }).sort({ createdAt: -1 }).lean();

    res.render("pages/trash/bin/report/response/table", {
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
                        title: "Tanggapan",
                        icon: "pen-nib",
                        value: await BinReportResponse.countDocuments({ idBinReport: id }).lean(),
                    },
                ],
            },
        ],
        filterArray: [],
        tableItemArray: tableItemArray,
        idBin: idBin,
        idBinReport: id,
    });
});

responseReportBinTrashRouter
    .route("/create")
    .get(async (req, res) => {
        res.render("pages/trash/bin/report/response/create", {
            headTitle,
            navActive,
            toastResponse: req.query.response,
            toastTitle: req.query.response == "success" ? "Data Berhasil Dibuat" : "Data Gagal Dibuat",
            toastText: req.query.text,
            detailedInputArray: [
                {
                    id: 1,
                    name: "message",
                    display: "Pesan",
                    type: "textarea",
                    value: null,
                    placeholder: "Input pesan disini",
                    enable: true,
                },
            ],
            idBin: req.query.idBin,
            idBinReport: req.query.id,
        });
    })
    .post(async (req, res) => {
        if (![req.body.message].includes(undefined)) {
            const itemObject = new BinReportResponse({
                _id: (await BinReportResponse.findOne().select("_id").sort({ _id: -1 }).lean())?._id + 1 || 1,
                idBinReport: req.query.id,
                message: req.body.message,
                createdAt: new Date(),
            });

            try {
                await itemObject.save();
                res.redirect(`create?idBin=${req.query.idBin}&id=${req.query.id}&response=success`);
            } catch (error: any) {
                res.redirect(`create?idBin=${req.query.idBin}&id=${req.query.id}&response=error`);
            }
        } else {
            res.redirect(`create?idBin=${req.query.idBin}&id=${req.query.id}&response=error&text=Data tidak lengkap`);
        }
    });

responseReportBinTrashRouter
    .route("/delete")
    .get(async (req, res) => {
        const id = req.query.id;
        const idBin = req.query.idBin;
        const idBinReport = req.query.idBinReport;
        const dataExist = await BinReportResponse.exists({ _id: id }).lean();

        if (dataExist != null) {
            const itemObject = await BinReportResponse.findOne({ _id: id }).select({ message: true }).lean();
            res.render("pages/trash/bin/report/response/delete", {
                headTitle,
                navActive,
                toastResponse: req.query.response,
                toastTitle: req.query.response == "success" ? "Data Berhasil Dihapus" : "Data Gagal Dihapus",
                toastText: req.query.text,
                id,
                detailedInputArray: [
                    {
                        id: 1,
                        name: "message",
                        display: "Pesan",
                        type: "textarea",
                        value: itemObject.message,
                        placeholder: "Input pesan disini",
                        enable: false,
                    },
                ],
                idBin: idBin,
                idBinReport: idBinReport,
            });
        } else {
            res.redirect(`./?idBin=${idBin}&id=${idBinReport}&response=error&text=Data tidak valid`);
        }
    })
    .post(async (req, res) => {
        const id = req.query.id;
        const dataExist = await BinReportResponse.exists({ _id: id }).lean();

        if (dataExist != null) {
            try {
                await BinReportResponse.deleteOne({ _id: id }).lean();

                res.redirect(`./?idBin=${req.query.idBin}&id=${req.query.idBinReport}&response=success`);
            } catch (error: any) {
                res.redirect(`delete?idBin=${req.query.idBin}&idBinReport=${req.query.idBinReport}&id=${id}&response=error`);
            }
        } else {
            res.redirect(`./?idBin=${req.query.idBin}&id=${req.query.idBinReport}&response=error&text=Data tidak valid`);
        }
    });
