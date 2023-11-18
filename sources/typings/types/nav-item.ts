export type pageItemChildType = {
    id: number;
    title: string;
    link: string;
    icon: string;
    level: number;
    confirm: boolean;
};

export type pageItemType = {
    id: number;
    title: string;
    icon: string;
    level: number;
    child: pageItemChildType[];
};
