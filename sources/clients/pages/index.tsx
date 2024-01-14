import Head from "next/head";
import { useEffect, useState } from "react";

const IndexPage = (): JSX.Element => {
  const [data, setData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch("https://trashecker-api.irswanda.com/api/trash-bin");
                const response = await request.json();

                setData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const intervalId = setInterval(fetchData, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

  return (<>
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="css/style.css" />

        <link rel="shortcut icon" href="img/icon.png" type="image/x-icon" />
        <title>Trashecker | Home</title>
    </Head>

    <>
        <section className="home" id="home">
            <div className="home-text">
                <h1>Trash<span>ecker</span></h1>
                <p>In collaboration with <span>Informatika</span> x <span>Desain Komunikasi Visual</span></p>
                <h6>Trash <span>Checker</span> status is currently:</h6>
                <button style={{backgroundColor: (data ? (data.full === true ? "#D22B2B" : "#FED307" ) : "#FED307")}}>{data ? (data.full === true ? "Full" : "Empty") : "Empty"}</button>
            </div>

            <div className="home-img">
                <img src="img/profile.png" alt="Profile" />
            </div>
        </section>
    </>
  </>)
};

export default IndexPage;

