import express, { Router } from "express";

import { headTitle } from "../..";

import { Bin, BinActivity, BinReport } from "../../../../models";
import { localMoment, upperCaseFirst } from "../../../../utility";
import { responseReportBinTrashRouter } from "./response";

const navActive = [3, 2];
export const reportBinTrashRouter = Router();

reportBinTrashRouter.use(express.static("sources/public"));
reportBinTrashRouter.use(express.urlencoded({ extended: true }));

reportBinTrashRouter.route("/").get(async (req, res) => {
    const id: any = req.query.id;
    let tableItemArray: any = await BinReport.find({ idBin: id })
        .select({ identification: true, name: true, message: true, status: true, createdAt: true })
        .sort({ createdAt: -1 })
        .lean();

    const documentCount = await BinReport.countDocuments().lean();

    res.render("pages/trash/bin/report/table", {
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
                        title: "Laporan",
                        icon: "clipboard",
                        value: documentCount,
                    },
                ],
            },
        ],
        filterArray: [],
        tableItemArray,
        idBin: id,
    });
});

reportBinTrashRouter.route("/accept").get(async (req, res) => {
    const id = req.query.id;
    const idBin = req.query.idBin;
    const dataExist = await BinReport.exists({ _id: id, idBin: idBin, status: 0 }).lean();

    if (dataExist != null) {
        try {
            await BinReport.updateOne(
                { _id: id },
                {
                    status: 2,
                }
            ).lean();

            res.redirect(`./?id=${idBin}&response=success`);
        } catch (error: any) {
            res.redirect(`./?id=${idBin}&response=error`);
        }
    } else if (dataExist == null) {
        res.redirect(`./?id=${idBin}&response=error&text=Data tidak valid`);
    }
});

reportBinTrashRouter.route("/reject").get(async (req, res) => {
    const id = req.query.id;
    const idBin = req.query.idBin;
    const dataExist = await BinReport.exists({ _id: id, idBin: idBin, status: 0 }).lean();

    if (dataExist != null) {
        try {
            await BinReport.updateOne(
                { _id: id },
                {
                    status: 1,
                }
            ).lean();

            res.redirect(`./?id=${idBin}&response=success`);
        } catch (error: any) {
            res.redirect(`./?id=${idBin}&response=error`);
        }
    } else if (dataExist == null) {
        res.redirect(`./?id=${idBin}&response=error&text=Data tidak valid`);
    }
});

reportBinTrashRouter.route("/cancel").get(async (req, res) => {
    const id = req.query.id;
    const idBin = req.query.idBin;
    const dataObject = await BinReport.findOne({ _id: id, idBin: idBin, status: { $ne: 0 } })
        .select({ status: true })
        .lean();

    if (dataObject != null) {
        try {
            await BinReport.updateOne(
                { _id: id },
                {
                    status: [1, 2].includes(dataObject.status) ? 0 : 2,
                }
            ).lean();

            res.redirect(`./?id=${idBin}&response=success`);
        } catch (error: any) {
            res.redirect(`./?id=${idBin}&response=error`);
        }
    } else {
        res.redirect(`./?id=${idBin}&response=error&text=Data tidak valid`);
    }
});

reportBinTrashRouter.route("/done").get(async (req, res) => {
    const id = req.query.id;
    const idBin = req.query.idBin;
    const dataExist = await BinReport.exists({ _id: id, idBin: idBin, status: 2 }).lean();

    if (dataExist != null) {
        try {
            await BinReport.updateOne(
                { _id: id },
                {
                    status: 3,
                }
            ).lean();

            res.redirect(`./?id=${idBin}&response=success`);
        } catch (error: any) {
            res.redirect(`./?id=${idBin}&response=error`);
        }
    } else if (dataExist == null) {
        res.redirect(`./?id=${idBin}&response=error&text=Data tidak valid`);
    }
});

reportBinTrashRouter.use("/response", responseReportBinTrashRouter);
