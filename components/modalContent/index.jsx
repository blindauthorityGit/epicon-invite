import React from "react";

const ImpressumModal = () => {
    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="col-span-12 font-facundosemiboldNEU">
                <h2
                    data-aos="fade-left"
                    className="font-thin font-freight text-3xl sm:text-xl text-darkText lg:text-4xl  mt-4 mb-4 lg:mb-6"
                >
                    Impressum
                </h2>
                <p className="mb-8">
                    EPICON Engineering GmbH.,<br></br>
                    Firmensitz: 2540 Bad Vöslau, Energiestraße 2<br></br>
                    Zweigstelle: 2640 Gloggnitz, Heufeldstraße 19<br></br>
                    ATU 68163435, FN 402637 p, Firmenbuchgericht Wiener Neustadt
                </p>
                <p className="mb-8">
                    Berufsbezeichnung: Ingenieurbüro auf dem Fachgebiet Elektrotechnik<br></br>
                    Geschäftsführer: Herr Ing. Tritt Ernst<br></br>
                    Tel.: +43 2662 400 60, Fax: +43 1 2533 033 3200
                </p>
                <p>E-Mail: info@epicon.pro</p>
            </div>
        </div>
    );
};

export default ImpressumModal;
