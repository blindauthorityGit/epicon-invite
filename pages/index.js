import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import { Form1 } from "../components/forms";
import { Modal, Overlay, ModalMobile } from "../components/modal";
import ImpressumModal from "../components/modalContent";
import { useRouter } from "next/router";
import { Rings } from "react-loader-spinner";

// ASSETS
import BGDesktop from "../assets/bgDesktop.jpg";
import TenYears from "../assets/SVG/10years.svg";
import Studio67 from "../assets/1x/studio67.png";
import Epicon from "../assets/SVG/epicon.svg";
//DB
import { PrismaClient } from "@prisma/client";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { EMAIL, FNAME, LNAME } = router.query;

    useEffect(() => {
        setTimeout(() => {
            console.log({ EMAIL, FNAME, LNAME });
        }, 500);
    }, []);

    const handleSendData = async () => {
        const data = {
            EMAIL,
            FNAME,
            LNAME,
        };

        try {
            const response = await fetch("./api/absage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setShowSpinner(true);

            if (response.ok) {
                // Handle success response
                console.log("SUCCESS");
                setShowSpinner(false);

                setSuccess(true);
            } else {
                console.log("SOMETHING WRONG");
                // Handle error response
            }
        } catch (error) {
            console.log("error: ", error);
            // Handle fetch error
        }
    };

    return (
        <div className="w-full 2xl:min-h-screen bg-cover" style={{ backgroundImage: `url(${BGDesktop.src})` }}>
            <Head>
                <title>Site title</title>
            </Head>

            {showModal ? (
                <>
                    <Modal
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        <ImpressumModal></ImpressumModal>
                    </Modal>
                    <Overlay
                        onClick={() => {
                            setShowModal(false);
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
                <div className="col-span-12 mb-4 order-3 pb-8 sm:üb-0 sm:order-none grid grid-cols-12 bg-white rounded-lg mt-10 px-8 sm:px-12 sm:mx-8 relative">
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
                <div className="col-span-12 lg:col-span-8 order-last px-8 lg:mb-16 text-white text-sm font-facundosemiboldNEU">
                    Sollten Sie bedauerlicherweise nicht an unserem Event teilnehmen können, lassen Sie uns dies bitte
                    wissen.
                </div>
                <div className="col-span-12 lg:col-span-4 order-last px-8 mb-8 text-white font-facundosemiboldNEU">
                    {showSpinner ? (
                        <div className="col-span-12 flex justify-center">
                            <Rings
                                height="80"
                                width="80"
                                color="#3785d0"
                                radius="6"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="rings-loading"
                            />
                        </div>
                    ) : !success ? (
                        <button
                            className="bg-[#3785d0] hover:bg-[#15395b] transition-all duration-300 px-8 py-2 rounded-lg text-white font-facundosemiboldNEU text-sm mt-4"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log({ EMAIL, FNAME, LNAME });
                                handleSendData();
                            }}
                        >
                            Absage senden
                        </button>
                    ) : null}
                    {success ? (
                        <div className="text-primaryColor font-facundosemiboldNEU text-sm w-96 mt-4">
                            Danke für Ihre Bestätigung.
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="col-span-12 lg:col-span-8 order-last px-8 lg:mb-16 text-white text-xs lg:text-sm font-facundosemiboldNEU">
                    <strong className="font-facundoblack"> Sie haben Fragen?</strong>
                    <br /> Brigitte Neziraj:
                    <br /> info@epicon.pro
                    <br /> Tel: 02662 40060 15
                    <br /> Mobil: 0664 8890 8663
                </div>
                <div className="col-span-12 order-last px-8 mt-8 mb-16 flex justify-between font-facundosemiboldNEU">
                    <div
                        onClick={() => {
                            setShowModal(true);
                            console.log("BUBU");
                        }}
                        className="text-white hover:underline cursor-pointer font-facundosemiboldNEU"
                    >
                        Impressum
                    </div>
                    <a href="https://www.epicon.pro/">
                        <img src={Epicon.src} className="w-16" alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
}
