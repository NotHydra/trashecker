import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleGuard } from "../../authentication/guard/role.guard";

import { Bin, BinReport } from "../../models";
import { binTrashRouter } from "./bin";

export const trashRouter = Router();
export const headTitle = "Sampah";
const navActive = [3, 1];

trashRouter.get("/", async (req, res) => {
    const currentYear = new Date().getFullYear();

    const binChartData: any = await datasetYear(Bin, currentYear);
    const binReportChartData: any = await datasetYear(BinReport, currentYear);

    res.render("pages/index", {
        headTitle,
        navActive,
        toastResponse: req.query.response,
        toastTitle: req.query.response == "success" ? "Login Berhasil" : "Login Gagal",
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
                        link: "trash/bin",
                    },
                    {
                        id: 2,
                        title: "Penuh",
                        icon: "circle-plus",
                        value: await Bin.countDocuments({ status: true }).lean(),
                        link: "trash/bin",
                    },
                    {
                        id: 3,
                        title: "Kosong",
                        icon: "circle-minus",
                        value: await Bin.countDocuments({ status: false }).lean(),
                        link: "trash/bin",
                    },
                ],
            },
            {
                id: 2,
                cardItemChild: [
                    {
                        id: 1,
                        title: "Laporan",
                        icon: "clipboard",
                        value: await BinReport.countDocuments().lean(),
                        link: "trash/bin",
                    },
                    {
                        id: 2,
                        title: "Belum Direspon",
                        icon: "circle-exclamation",
                        value: await BinReport.countDocuments({ status: 0 }).lean(),
                        link: "trash/bin",
                    },
                    {
                        id: 3,
                        title: "Ditolak",
                        icon: "circle-minus",
                        value: await BinReport.countDocuments({ status: 1 }).lean(),
                        link: "trash/bin",
                    },
                    {
                        id: 4,
                        title: "Diterima",
                        icon: "circle-plus",
                        value: await BinReport.countDocuments({ status: 2 }).lean(),
                        link: "trash/bin",
                    },
                    {
                        id: 5,
                        title: "Selesai",
                        icon: "circle-check",
                        value: await BinReport.countDocuments({ status: 3 }).lean(),
                        link: "trash/bin",
                    },
                ],
            },
        ],
        lineChartArray: [
            {
                id: 1,
                lineChartChild: [
                    {
                        id: 1,
                        title: "Statistik Tempat Pembuangan Baru",
                        link: { link: "trash/bin", title: "Tempat Pembuangan", subTitle: "Sampah" },
                        value: binChartData.currentYearValue,
                        text: "Tempat Pembuangan Baru",
                        percentage: binChartData.percentageIncrease,
                        timeRange: "Sejak Tahun Lalu",
                        dataset: binChartData.dataset,
                        firstLegend: "Tahun Ini",
                        secondLegend: "Tahun Lalu",
                    },
                    {
                        id: 2,
                        title: "Statistik Laporan Tempat Pembuangan Baru",
                        link: { link: "trash/bin", title: "Laporan Tempat Pembuangan", subTitle: "Sampah" },
                        value: binReportChartData.currentYearValue,
                        text: "Laporan Tempat Pembuangan Baru",
                        percentage: binReportChartData.percentageIncrease,
                        timeRange: "Sejak Tahun Lalu",
                        dataset: binReportChartData.dataset,
                        firstLegend: "Tahun Ini",
                        secondLegend: "Tahun Lalu",
                    },
                ],
            },
        ],
        donutChartArray: [
            {
                id: 1,
                donutChartChild: [
                    {
                        id: 1,
                        title: "Statistik Tempat Pembuangan Berdasarkan Status",
                        link: { link: "trash/bin", title: "Tempat Pembuangan", subTitle: "Sampah" },
                        dataset: [
                            {
                                id: 1,
                                label: "Penuh",
                                value: await Bin.countDocuments({ status: true }).lean(),
                                color: blueColorPattern(1, 2),
                            },
                            {
                                id: 2,
                                label: "Kosong",
                                value: await Bin.countDocuments({ status: false }).lean(),
                                color: blueColorPattern(2, 2),
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: "Statistik Laporan Berdasarkan Status",
                        link: { link: "trash/bin", title: "Laporan Tempat Pembuangan", subTitle: "Sampah" },
                        dataset: [
                            {
                                id: 1,
                                label: "Belum Direspon",
                                value: await BinReport.countDocuments({ status: 0 }).lean(),
                                color: blueColorPattern(1, 4),
                            },
                            {
                                id: 2,
                                label: "Ditolak",
                                value: await BinReport.countDocuments({ status: 1 }).lean(),
                                color: blueColorPattern(2, 4),
                            },
                            {
                                id: 3,
                                label: "Diterima",
                                value: await BinReport.countDocuments({ status: 2 }).lean(),
                                color: blueColorPattern(3, 4),
                            },
                            {
                                id: 4,
                                label: "Selesai",
                                value: await BinReport.countDocuments({ status: 3 }).lean(),
                                color: blueColorPattern(4, 4),
                            },
                        ],
                    },
                ],
            },
        ],
    });
});

trashRouter.use("/bin", binTrashRouter);
