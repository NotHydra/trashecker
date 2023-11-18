import { Router } from "express";

import { blueColorPattern, datasetYear } from "../../utility";
import { roleCheck, roleGuard } from "../../authentication/guard/role.guard";

import { Activity, User } from "../../models";

import { accountUserRouter } from "./user";
import { accountActivityRouter } from "./activity";
import { app } from "../..";

export const accountRouter = Router();
export const headTitle = "Pengguna";
const navActive = [2, 1];

accountRouter.get("/", async (req, res) => {
    const currentYear = new Date().getFullYear();

    const cardItemChild = [
        {
            id: 1,
            title: "User",
            icon: "user",
            value: await User.countDocuments().lean(),
            link: "account/user",
        },
    ];

    const userChartData: any = await datasetYear(User, currentYear);
    const lineChartChild = [
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
    ];

    const userTotal = await User.countDocuments().lean();
    const donutChartArray = [
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
    ];

    if (roleCheck(app.locals.userObject.role, 4)) {
        cardItemChild.push({
            id: 2,
            title: "Aktivitas",
            icon: "eye",
            value: await Activity.countDocuments().lean(),
            link: "account/activity",
        });

        const activityChartData: any = await datasetYear(Activity, currentYear);
        lineChartChild.push({
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
        });

        donutChartArray.push({
            id: 2,
            donutChartChild: [
                {
                    id: 1,
                    title: "Statistik Aktivitas Berdasarkan User",
                    link: { link: "account/activity", title: "Aktivitas", subTitle: "Akun" },
                    dataset: await Promise.all(
                        (
                            await User.find().select("_id username").sort({ username: 1 }).lean()
                        ).map(async (itemObject, itemIndex) => {
                            return {
                                id: itemIndex + 1,
                                label: itemObject.username,
                                value: await Activity.countDocuments({ idUser: itemObject._id }).lean(),
                                color: blueColorPattern(itemIndex + 1, userTotal),
                            };
                        })
                    ),
                },
            ],
        });
    }

    res.render("pages/index", {
        headTitle,
        navActive,
        cardItemArray: [
            {
                id: 1,
                cardItemChild,
            },
        ],
        lineChartArray: [
            {
                id: 1,
                lineChartChild,
            },
        ],
        donutChartArray,
    });
});

accountRouter.use("/user", accountUserRouter);
accountRouter.use("/activity", roleGuard(4), accountActivityRouter);
