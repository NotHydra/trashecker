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
                link: "data-pribadi",
                icon: "circle-user",
                level: 1,
                confirm: false,
            },
        ],
    },
    {
        id: 2,
        title: "Pengguna",
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
