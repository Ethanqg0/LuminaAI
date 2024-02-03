import React, { useState } from 'react'
import Sun from '../assets/sun.png'
import Moon from '../assets/moon-bg.png'

export default function Nav( {isLightTheme, toggleTheme} ) {
    return (
        <div className={isLightTheme ? "z-20 sticky top-0 flex items-center flex-row w-full h-16 bg-white text-black border-b-1 border-gray-400" : "z-20 sticky top-0 flex items-center flex-row w-full h-16 bg-black text-white border-b-1 border-gray-800"}>
            <ul className="flex justify-center w-1/4">
                <h1 className="font-bold text-2xl">LuminaAI</h1>
            </ul>
            <ul className="flex justify-center w-1/2">
                <div className="flex w-1/2 justify-between">
                    <li>About</li>
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>FAQ</li>
                </div>
            </ul>
            <ul className="flex justify-center items-center w-1/4">
                <img onClick={toggleTheme} src={isLightTheme ? Sun : Moon} className={isLightTheme ? "w-8 h-8 mr-4" : "mt-2 w-8 h-8 mr-4"}/>
                <li className="mt-1">Login</li>
            </ul>
        </div>
    )
}