import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleGuard } from "../../authentication/guard/role.guard";

import { Bin, BinReport, User, UserActivity } from "../../models";

import { homeProfileRouter } from "./profile";

export const homeRouter = Router();
export const headTitle = "Utama";
const navActive = [1, 1];

homeRouter.get("/", roleGuard(1), async (req, res) => {
    const currentYear = new Date().getFullYear();

    const userChartData: any = await datasetYear(User, currentYear);
    const binChartData: any = await datasetYear(Bin, currentYear);

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
                        title: "User",
                        icon: "user",
                        value: await User.countDocuments().lean(),
                        link: "account/user",
                    },
                    {
                        id: 2,
                        title: "Aktivitas User",
                        icon: "eye",
                        value: await UserActivity.countDocuments().lean(),
                        link: "account/activity",
                    },
                ],
            },
            {
                id: 2,
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
                id: 3,
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
                        title: "Statistik User Baru",
                        link: { link: "account/user", title: "User", subTitle: "Akun" },
                        value: userChartData.currentYearValue,
                        text: "User Baru",
                        percentage: userChartData.percentageIncrease,
                        timeRange: "Sejak Tahun Lalu",
                        dataset: userChartData.dataset,
                        firstLegend: "Tahun Ini",
                        secondLegend: "Tahun Lalu",
                    },
                    {
                        id: 2,
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
                ],
            },
        ],
        donutChartArray: [
            {
                id: 1,
                donutChartChild: [
                    {
                        id: 1,
                        title: "Statistik User Berdasarkan Role",
                        link: { link: "account/user", title: "User", subTitle: "Akun" },
                        dataset: [
                            {
                                id: 1,
                                label: "Operator",
                                value: await User.countDocuments({ role: "operator" }).lean(),
                                color: blueColorPattern(1, 2),
                            },
                            {
                                id: 2,
                                label: "Admin",
                                value: await User.countDocuments({ role: "admin" }).lean(),
                                color: blueColorPattern(2, 2),
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: "Statistik User Berdasarkan Status",
                        link: { link: "account/user", title: "User", subTitle: "Akun" },
                        dataset: [
                            {
                                id: 1,
                                label: "Aktif",
                                value: await User.countDocuments({ status: true }).lean(),
                                color: blueColorPattern(1, 2),
                            },
                            {
                                id: 2,
                                label: "Tidak Aktif",
                                value: await User.countDocuments({ status: false }).lean(),
                                color: blueColorPattern(2, 2),
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
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

homeRouter.use("/profile", homeProfileRouter);
