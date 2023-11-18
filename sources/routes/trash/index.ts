import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleGuard } from "../../authentication/guard/role.guard";

import { Bin } from "../../models";
import { binTrashRouter } from "./bin";

export const trashRouter = Router();
export const headTitle = "Sampah";
const navActive = [3, 1];

trashRouter.get("/", async (req, res) => {
    const currentYear = new Date().getFullYear();

    const binChartData: any = await datasetYear(Bin, currentYear);

    res.render("pages/index", {
        headTitle,
        navActive,
        toastResponse: req.query.response,
        toastTitle: req.query.response == "success" ? "Login Berhasil" : "Login Gagal",
        toastText: req.query.text,
        cardItemArray: [
            // {
            //     id: 1,
            //     cardItemChild: [
            //         {
            //             id: 1,
            //             title: "Tempat Pembuangan Sampah",
            //             icon: "user",
            //             value: await TrashBin.countDocuments().lean(),
            //             link: "trash/trash-bin",
            //         },
            //     ],
            // },
        ],
        lineChartArray: [
            // {
            //     id: 1,
            //     lineChartChild: [
            //         {
            //             id: 1,
            //             title: "Statistik Tempat Pembuangan Sampah Baru",
            //             link: { link: "trash/trash-bin", title: "Tempat Pembuangan Sampah", subTitle: "Sampah" },
            //             value: trashBinChartData.currentYearValue,
            //             text: "Tempat Pembuangan Sampah Baru",
            //             percentage: trashBinChartData.percentageIncrease,
            //             timeRange: "Sejak Tahun Lalu",
            //             dataset: trashBinChartData.dataset,
            //             firstLegend: "Tahun Ini",
            //             secondLegend: "Tahun Lalu",
            //         },
            //     ],
            // },
        ],
        donutChartArray: [
            // {
            //     id: 1,
            //     donutChartChild: [
            //         {
            //             id: 1,
            //             title: "Statistik User Berdasarkan Role",
            //             link: { link: "account/user", title: "User", subTitle: "Akun" },
            //             dataset: [
            //                 {
            //                     id: 1,
            //                     label: "Operator",
            //                     value: await User.countDocuments({ role: "operator" }).lean(),
            //                     color: blueColorPattern(1, 2),
            //                 },
            //                 {
            //                     id: 2,
            //                     label: "Admin",
            //                     value: await User.countDocuments({ role: "admin" }).lean(),
            //                     color: blueColorPattern(2, 2),
            //                 },
            //             ],
            //         },
            //         {
            //             id: 2,
            //             title: "Statistik User Berdasarkan Status",
            //             link: { link: "account/user", title: "User", subTitle: "Akun" },
            //             dataset: [
            //                 {
            //                     id: 1,
            //                     label: "Aktif",
            //                     value: await User.countDocuments({ status: true }).lean(),
            //                     color: blueColorPattern(1, 2),
            //                 },
            //                 {
            //                     id: 2,
            //                     label: "Tidak Aktif",
            //                     value: await User.countDocuments({ status: false }).lean(),
            //                     color: blueColorPattern(2, 2),
            //                 },
            //             ],
            //         },
            //     ],
            // },
        ],
    });
});

trashRouter.use("/bin", binTrashRouter);
