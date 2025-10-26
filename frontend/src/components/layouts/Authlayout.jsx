import React from 'react'
import night from "../../assets/images/night.jpg"
import men from "../../assets/images/men.jpg"

const Authlayout = ({ children }) => {
    return (
        <div
            className="flex w-screen h-screen bg-cover bg-center items-center justify-center"
            style={{ backgroundImage: `url(${night})` }}
        >
            {/* Centered Card */}
            <div className="flex flex-col md:flex-row w-[90vw] max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Left Side – Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                    <img
                        src={men}
                        alt="Side Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side – Login Form */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-white">


                    {children}
                </div>
            </div>
        </div>
    )
}

export default Authlayout