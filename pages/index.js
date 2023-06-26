import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import { Form1 } from "../components/forms";
import { Modal, Overlay, ModalMobile } from "../components/modal";
import ImpressumModal from "../components/modalContent";
// ASSETS
import BGDesktop from "../assets/bgDesktop.jpg";
import TenYears from "../assets/SVG/10years.svg";
import Studio67 from "../assets/1x/studio67.png";
import Epicon from "../assets/svg/epicon.svg";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="w-full 2xl:h-screen bg-cover" style={{ backgroundImage: `url(${BGDesktop.src})` }}>
            <Head>
                <title>Site title</title>
            </Head>

            {showModal ? (
                <>
                    <Modal
                        onClick={() => {
                            setShowModal(false);
                            console.log("BUBU");
                        }}
                    >
                        <ImpressumModal></ImpressumModal>
                    </Modal>
                    <Overlay
                        onClick={() => {
                            setShowModal(false);
                            console.log("BUBU");
                        }}
                    ></Overlay>
                </>
            ) : null}

            <div className="container mx-auto grid grid-cols-12 px-4 sm:px-0">
                <div className="col-span-6 sm:col-span-12 mt-12 order-first sm:order-none">
                    <img src={TenYears.src} className="lg:h-28" alt="" />
                </div>
                <div className="col-span-12 lg:col-span-6 order-2 sm:order-none">
                    <h2 className="text-white font-facundosemibold text-2xl lg:text-4xl mt-8 pl-8">SAVE THE DATE</h2>
                </div>
                <div className="col-span-6 mt-8 flex justify-end order-1 sm:order-none pt-16 sm:pt-0">
                    <a href="https://www.studio67.at/">
                        <img src={Studio67.src} className="h-8 lg:h-12" alt="" />
                    </a>
                </div>
                <div className="col-span-12 mb-8 order-3 pb-8 sm:üb-0 sm:order-none grid grid-cols-12 bg-white rounded-lg mt-10 px-8 sm:px-12 sm:mx-8 relative">
                    <div className="absolute font-facundosemiboldNEU text-xl sm:text-3xl text-white bg-[#008BD2] tracking-wider px-8 py-2 rounded-lg top-[-1.35rem] lg:top-[-2rem] right-8 sm:right-[-2rem]">
                        15|09|2023
                    </div>
                    <div className="col-span-12 ">
                        <p className="text-[#254F81] text-sm sm:text-lg font-facundosemiboldNEU py-12 tracking-wide">
                            Um bestmöglich planen zu können, bitten wir Sie, uns bescheid zu geben, ob wir mit Ihnen
                            rechnen dürfen.
                        </p>
                        <Form1 />
                    </div>
                </div>
                <div className="col-span-12 order-last px-8 mb-16 flex justify-between">
                    <a href="https://www.epicon.pro/">
                        <img src={Epicon.src} className="w-16" alt="" />
                    </a>
                    <div
                        onClick={() => {
                            setShowModal(true);
                            console.log("BUBU");
                        }}
                        className="text-white hover:underline cursor-pointer"
                    >
                        Impressum
                    </div>
                </div>
            </div>
        </div>
    );
}
