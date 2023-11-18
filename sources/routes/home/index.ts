import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleGuard } from "../../authentication/guard/role.guard";

import { User } from "../../models";

import { homeProfileRouter } from "./profile";

export const homeRouter = Router();
export const headTitle = "Utama";
const navActive = [1, 1];

homeRouter.get("/", roleGuard(1), async (req, res) => {
    const currentYear = new Date().getFullYear();

    const userChartData: any = await datasetYear(User, currentYear);

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
        ],
    });
});

homeRouter.use("/profile", homeProfileRouter);
