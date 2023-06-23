import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import { Form1 } from "../components/forms";
// ASSETS
import BGDesktop from "../assets/bgDesktop.jpg";
import TenYears from "../assets/SVG/10years.svg";
import Studio67 from "../assets/1x/studio67.png";

export default function Home() {
    return (
        <div className="w-full lg:h-screen bg-cover" style={{ backgroundImage: `url(${BGDesktop.src})` }}>
            <Head>
                <title>Site title</title>
            </Head>
            <div className="container mx-auto grid grid-cols-12 px-4 sm:px-0">
                <div className="col-span-6 sm:col-span-12 mt-12 order-first sm:order-none">
                    <img src={TenYears.src} className="lg:h-28" alt="" />
                </div>
                <div className="col-span-6 order-2 sm:order-none">
                    <h2 className="text-white font-facundosemibold lg:text-4xl mt-8 pl-8">SAVE THE DATE</h2>
                </div>
                <div className="col-span-6 mt-8 flex justify-end order-1 sm:order-none pt-16 sm:pt-0">
                    <img src={Studio67.src} className="h-8 lg:h-12" alt="" />
                </div>
                <div className="col-span-12 order-3 pb-8 sm:üb-0 sm:order-none grid grid-cols-12 bg-white rounded-lg mt-10 px-8 sm:px-12 sm:mx-8 relative">
                    <div className="absolute font-facundosemiboldNEU text-xl sm:text-3xl text-white bg-[#008BD2] tracking-wider px-8 py-2 rounded-lg top-[-2rem] right-8 sm:right-[-2rem]">
                        15|09|2023
                    </div>
                    <div className="col-span-12">
                        <p className="text-[#254F81] text-sm sm:text-lg font-facundosemiboldNEU py-12 tracking-wide">
                            Um bestmöglich planen zu können, bitten wir Sie, uns bescheid zu geben, ob wir mit Ihnen
                            rechnen dürfen.
                        </p>
                        <Form1 />
                    </div>
                </div>
            </div>
        </div>
    );
}
