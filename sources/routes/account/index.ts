import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleCheck, roleGuard } from "../../authentication/guard/role.guard";

import { UserActivity, User } from "../../models";

import { accountUserRouter } from "./user";
import { accountActivityRouter } from "./activity";
import { app } from "../..";

export const accountRouter = Router();
export const headTitle = "Akun";
const navActive = [2, 1];

accountRouter.get("/", async (req, res) => {
    const currentYear = new Date().getFullYear();

    const userChartData: any = await datasetYear(User, currentYear);
    const activityChartData: any = await datasetYear(UserActivity, currentYear);

    res.render("pages/index", {
        headTitle,
        navActive,
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
                        title: "Statistik Aktivitas Baru",
                        link: { link: "account/activity", title: "Aktivitas", subTitle: "Akun" },
                        value: activityChartData.currentYearValue,
                        text: "Aktivitas Baru",
                        percentage: activityChartData.percentageIncrease,
                        timeRange: "Sejak Tahun Lalu",
                        dataset: activityChartData.dataset,
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

accountRouter.use("/user", accountUserRouter);
accountRouter.use("/activity", accountActivityRouter);
