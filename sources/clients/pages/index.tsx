import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import TrashBinInterface from "../interfaces/trash-bin.interface";


const socket = io('https://trashecker-api.irswanda.com');

const IndexPage = (): JSX.Element => {
	const [trashBinPercentage, setTrashBinPercetange] = useState<number>(0);
	const [trashBinText, setTrashBinText] = useState<string>("Empty");
	const [trashBinColor, setTrashBinColor] = useState<string>("#33FF66");

	useEffect(() => {
		socket.on("trashBinChanged", (trashBin) => {
			console.log(trashBin)
		})

		// const getPercentage = async (): Promise<void> => {
		// 	try {
		// 		const response: AxiosResponse<TrashBinInterface[]> = await axios<TrashBinInterface[]>({
		// 			method: "GET",
		// 			url: "https://trashecker-api.irswanda.com/api/trash-bin",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			}
		// 		});

		// 		const trashBin: TrashBinInterface = response.data[0];

		// 		const rawPercentage: number = Math.round(((trashBin.maxCapacity - trashBin.currentCapacity) / trashBin.maxCapacity) * 100) * 2.75;
		// 		const percentage: number = (rawPercentage < 0) ? 0 : rawPercentage;
		// 		const { text, color }: { text: string, color: string } = convertPercentage(percentage);

		// 		console.log(trashBin.maxCapacity, trashBin.currentCapacity, percentage)

		// 		setTrashBinPercetange(percentage);
		// 		setTrashBinText(text);
		// 		setTrashBinColor(color);
		// 	} catch (error) {
		// 		console.error("Error fetching data:", error);
		// 	}
		// };

		// const intervalId: NodeJS.Timeout = setInterval(getPercentage, 500);

		// return () => {
		// 	clearInterval(intervalId);
		// };
	}, []);

	const convertPercentage = (percentage: number): { text: string, color: string } => {
		if (0 <= percentage && percentage <= 20) {
			return {
				text: "Empty",
				color: "#33FF66"
			};
		} else if (20 < percentage && percentage <= 40) {
			return {
				text: "Almost Empty",
				color: "#CCFF66"
			};
		} else if (40 < percentage && percentage <= 60) {
			return {
				text: "Half Full",
				color: "#FFCC33"
			};
		} else if (60 < percentage && percentage <= 80) {
			return {
				text: "Almost Full",
				color: "#FF9900"
			};
		} else if (80 < percentage && percentage <= 100) {
			return {
				text: "Full",
				color: "#FF6600"
			};
		} else if (percentage > 100) {
			return {
				text: "Overloaded!!!",
				color: "#FF0000"
			};
		}
	};

	return (<>
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

			<link rel="stylesheet" href="css/style.css" />

			<link rel="shortcut icon" href="img/icon.png" type="image/x-icon" />
			<title>Trashecker</title>
		</Head>

		<>
			<section className="home" id="home">
				<div className="home-text">
					<h1>Trash<span>ecker</span></h1>
					<p>In collaboration with <span>Informatics</span> x <span>Visual Communication Design</span></p>
					<h6>Trash <span>Checker</span> status is currently:</h6>
					<button style={{ backgroundColor: trashBinColor }}>{trashBinText} - {trashBinPercentage}%</button>
				</div>

				<div className="home-img">
					<img src="img/profile.png" alt="Profile" />
				</div>
			</section>
		</>
	</>)
};

export default IndexPage;

