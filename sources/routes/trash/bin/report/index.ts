import express, { Router } from "express";

import { headTitle } from "../..";

import { Bin, BinActivity, BinReport } from "../../../../models";
import { localMoment, upperCaseFirst } from "../../../../utility";

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
