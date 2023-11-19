import express, { Router } from "express";

import { isNotAuthenticated } from "../../common/middleware/isNotAuthenticated";
import { Bin, BinReport } from "../../models";

export const laporanRouter = Router();
const headTitle = "Laporan";

laporanRouter.use(express.static("sources/public"));
laporanRouter.use(express.urlencoded({ extended: false }));

laporanRouter.use(isNotAuthenticated);

laporanRouter
    .route("/")
    .get(async (req, res) => {
        const typeValue = req.query.type;

        let toastTitle;

        if (typeValue == "berhasil") {
            toastTitle = "Berhasil";
        } else if (typeValue == "gagal") {
            toastTitle = "Gagal";
        }

        res.render("pages/laporan", {
            headTitle: headTitle,
            toastResponse: req.query.response,
            toastTitle,
            toastText: req.query.text,
            binArray: await Bin.find().select({ _id: true, name: true }).lean(),
        });
    })
    .post(async (req, res) => {
        if (![req.body.identification, req.body.name, req.body.idBin, req.body.message].includes(undefined)) {
            const binObject: any = await Bin.findOne({ _id: req.body.idBin }).select({ _id: true }).lean();
            if (binObject != null) {
                const itemObject = new BinReport({
                    _id: (await BinReport.findOne().select("_id").sort({ _id: -1 }).lean())?._id + 1 || 1,
                    idBin: req.body.idBin,
                    identification: req.body.identification,
                    name: req.body.name,
                    message: req.body.message,
                    status: 0,
                    createdAt: new Date(),
                });
                try {
                    await itemObject.save();
                    res.redirect("/laporan?type=berhasil&response=success&text=Pengajuan laporan berhasil");
                } catch (error: any) {
                    res.redirect("/laporan?type=gagal&response=error&text=Pengajuan laporan gagal");
                }
            } else if (binObject == null) {
                res.redirect("/laporan?type=gagal&response=error&text=Data tidak valid");
            }
        } else {
            res.redirect("/laporan?type=gagal&response=error&text=Data tidak lengkap");
        }
    });
