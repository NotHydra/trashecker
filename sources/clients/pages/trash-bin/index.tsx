import Link from "next/link";
import React, { useEffect, useState } from "react";

const TrashBinPage = (): JSX.Element => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(await (await fetch("https://trashecker.irswanda.com/trash-bin")).json());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const intervalId = setInterval(fetchData, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <h1>Trashecker | Trash Bin</h1>

            <Link href="/">Home</Link>
            <Link href="/trash-bin">Trash Bin</Link>

            {data && (
                <div>
                    <h2>Trash Bin</h2>

                    <p>{data.name}</p>
                    <p>{String(data.full)}</p>
                </div>
            )}
        </>
    );
};

export default TrashBinPage;
