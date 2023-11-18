import "dotenv/config";
import { pageItemType } from "./typings/types/nav-item";

export const mongoDBURI: string = process.env.MONGO_DB_URI as string;
export const sessionSecret: string = process.env.SESSION_SECRET as string;

export const pageItemArray: pageItemType[] = [
    {
        id: 1,
        title: "Utama",
        icon: "house",
        level: 1,
        child: [
            {
                id: 1,
                title: "Dashboard",
                link: "",
                icon: "gauge",
                level: 1,
                confirm: false,
            },
            {
                id: 2,
                title: "Data Pribadi",
                link: "profile",
                icon: "circle-user",
                level: 1,
                confirm: false,
            },
        ],
    },
    {
        id: 2,
        title: "Akun",
        icon: "users",
        level: 2,
        child: [
            {
                id: 1,
                title: "Dashboard",
                link: "account",
                icon: "gauge",
                level: 2,
                confirm: false,
            },
            {
                id: 2,
                title: "User",
                link: "account/user",
                icon: "user",
                level: 2,
                confirm: false,
            },
            {
                id: 3,
                title: "Aktivitas",
                link: "account/activity",
                icon: "eye",
                level: 2,
                confirm: false,
            },
        ],
    },
    {
        id: 3,
        title: "Sampah",
        icon: "trash",
        level: 1,
        child: [
            {
                id: 1,
                title: "Dashboard",
                link: "trash",
                icon: "gauge",
                level: 1,
                confirm: false,
            },
            {
                id: 2,
                title: "Tempat Pembuangan",
                link: "trash/bin",
                icon: "dumpster",
                level: 1,
                confirm: false,
            },
            {
                id: 3,
                title: "Aktivitas",
                link: "trash/bin-activity",
                icon: "eye",
                level: 1,
                confirm: false,
            },
            {
                id: 4,
                title: "Laporan",
                link: "trash/bin-report",
                icon: "clipboard",
                level: 1,
                confirm: false,
            },
            {
                id: 5,
                title: "Respon",
                link: "trash/bin-report-respon",
                icon: "pen-nib",
                level: 1,
                confirm: false,
            },
        ],
    },
    {
        id: 4,
        title: "Pengaturan",
        icon: "gear",
        level: 1,
        child: [
            {
                id: 1,
                title: "Logout",
                link: "logout",
                icon: "right-from-bracket",
                level: 1,
                confirm: true,
            },
        ],
    },
];
