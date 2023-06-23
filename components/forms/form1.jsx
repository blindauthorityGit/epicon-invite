import React, { useState } from "react";
import MainContainer from "../layout/mainContainer";
import { useForm } from "react-hook-form";
import Error from "./error";
import axios from "axios";
import { Rings } from "react-loader-spinner";

const Form1 = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [number, setNumber] = useState(0);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    async function onSubmitForm(values) {
        console.log(values);
        setLoading(true);
        let config = {
            method: "post",
            // url: `http://localhost:3000/api/contact`,
            url: `/api/contact`,
            headers: {
                "Content-Type": "application/json",
            },
            data: values,
        };

        try {
            const response = await axios(config);
            reset();
            setLoading(false);
            setSuccess(true);
            console.log(response);
        } catch (err) {
            setLoading(false);
            setSuccess(false); // Set success to false when there's an error
            setError("Failed to send email"); // Set a specific error message to display to the user
            console.log(err);
        }
    }

    const incrementNumber = () => {
        setNumber(number + 1);
    };

    const decrementNumber = () => {
        if (number >= 1) {
            setNumber(number - 1);
        }
    };

    return (
        <MainContainer width="relative ">
            <div className="col-span-12  grid grid-cols-12 font-freight">
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid  grid-cols-12 footer topKontakt sm:gap-4 "
                    action=""
                >
                    <div className="hidden">
                        <label htmlFor="firstName">Name</label>
                        <input
                            {...register("firstName", { required: false })}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="off"
                        />
                    </div>
                    <label className="font-facundobold text-lg col-span-12 text-[#3785d0]" htmlFor="name">
                        BesucherIn
                    </label>

                    <input
                        {...register("name", { required: true })}
                        id="name"
                        className="col-span-12 font-facundosemiboldNEU shadow-lg lg:col-span-6 text-sm sm:text-lg  bg-transparent text-primaryColor-800 placeholder-primaryColor-500 p-2 sm:p-2"
                        type="text"
                        placeholder="Vorname / Nachname"
                    />
                    {errors.name && (
                        <Error klasse="col-span-12 lg:col-span-6 text-[#D55672] ">
                            Bitte geben Sie Ihren vollen Namen an
                        </Error>
                    )}

                    <input
                        {...register("email", { required: true })}
                        name="email"
                        id="email"
                        className="col-span-12 mt-4 sm:mt-0 font-facundosemiboldNEU shadow-lg lg:col-span-6 text-sm sm:text-lg  bg-transparent text-primaryColor-800 placeholder-primaryColor-500 p-2 sm:p-2"
                        type="email"
                        placeholder="Ihre Email"
                    />
                    {errors.email && (
                        <Error klasse="col-span-12 lg:col-span-6 text-[#D55672]">Bitte geben Sie Ihre Email an</Error>
                    )}
                    <label className="font-facundobold text-lg mt-6 col-span-12 text-[#3785d0]" htmlFor="firma">
                        Firma
                    </label>
                    <input
                        {...register("firma", { required: false })}
                        name="firma"
                        id="firma"
                        className="col-span-12 font-facundosemiboldNEU shadow-lg lg:col-span-6 text-sm sm:text-lg  bg-transparent text-primaryColor-800 placeholder-primaryColor-500 p-2 sm:p-2"
                        type="text"
                        placeholder="Firmenname"
                    />

                    <label className="font-facundobold text-lg mt-6 col-span-12 text-[#3785d0]" htmlFor="anzahl">
                        Anzahl Begleitpersonen
                    </label>

                    <input
                        {...register("anzahl", { required: true })}
                        type="number"
                        name="anzahl"
                        id="anzahl"
                        className="sm:col-span-12 col-span-2 mr-3 flex text-center justify-center items-center font-facundosemiboldNEU shadow-lg lg:col-span-2 text-sm sm:text-lg bg-transparent text-primaryColor-800 placeholder-primaryColor-500 p-2 sm:p-2"
                        value={number}
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                    <div className="wrapper flex flex-col space-y-1 col-span-2 sm:col-span-1 items-center">
                        <button
                            className="bg-[#3785d0] hover:bg-[#15395b] transition-all duration-300 w-[55%] text-white rounded-full flex items-center justify-center font-facundosemiboldNEU text-xl"
                            type="button"
                            onClick={incrementNumber}
                        >
                            +
                        </button>
                        <button
                            className="bg-[#3785d0] hover:bg-[#15395b] transition-all duration-300 w-[55%] text-white rounded-full flex items-center justify-center font-facundosemiboldNEU text-xl"
                            type="button"
                            onClick={decrementNumber}
                        >
                            -
                        </button>
                    </div>
                    <div className="check col-span-12 mt-2">
                        <div className="flex">
                            <input
                                {...register("checkbox", { required: true })}
                                id="checkbox"
                                className="mr-4 text-primaryColor"
                                type="checkbox"
                            />
                            <label
                                htmlFor="checkbox"
                                className="text-primaryColor-800 text-xs sm:text-xs leading-normal font-facundosemiboldNEU"
                            >
                                Ich erlaube Datenverarbeitung für Kontaktaufnahme laut Datenschutzerklärung.
                            </label>
                        </div>{" "}
                        {errors.checkbox && (
                            <Error klasse="block col-span-12 lg:col-span-6 text-[#D55672]">Bitte bestätigen</Error>
                        )}
                    </div>
                    {loading ? (
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
                    ) : (
                        <div className="w-full col-span-12">
                            <button
                                className="bg-[#3785d0] hover:bg-[#15395b] transition-all duration-300 px-8 py-2 rounded-lg text-white font-facundosemiboldNEU text-lg mt-4"
                                type="submit"
                            >
                                Anmeldung Absenden
                            </button>
                            {/* <button
                                className="bg-primaryColor-700 mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                                type="submit"
                            >
                                Absenden
                            </button> */}
                        </div>
                    )}
                </form>
                {success ? (
                    <div className="text-primaryColor font-facundosemiboldNEU w-96 mt-4">
                        Vielen Dank für Ihre Nachricht!
                    </div>
                ) : (
                    ""
                )}
                {error && <div className="text-[#D55672] w-96 mt-4">{error}</div>}
            </div>
            <div className="col-span-12 lg:col-span-4 grid grid-cols-12">{props.children}</div>
        </MainContainer>
    );
};

export default Form1;
