import React from 'react'
import Sun from '../assets/sun.png'
import Moon from '../assets/moon-bg.png'
import { useNavigate } from 'react-router-dom';

export default function Nav( {isLightTheme, toggleTheme} ) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/dashboard');
    };

    return (
        <div className={isLightTheme ? "z-20 shadow-md sticky top-0 flex items-center flex-row w-full h-16 bg-white text-black" : "z-50 sticky top-0 flex items-center flex-row w-full h-16 bg-gray-950 text-white shadow-md shadow-zinc-800"}>
            <ul className="flex justify-center w-1/4">
                <h1 className="text-2xl mt-1">LuminaAI</h1>
            </ul>
            <ul className="flex justify-center w-1/2">
                <div className="flex w-1/2 justify-between">
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Testimonials</li>
                    <li>FAQ</li>
                </div>
            </ul>
            <ul className="flex justify-center items-center w-1/4">
                <img onClick={toggleTheme} src={isLightTheme ? Sun : Moon} className={isLightTheme ? "w-8 h-8 mr-4" : "mt-2 w-8 h-8 mr-4"}/>
                <li onClick={handleLoginClick} className="mt-1">Login</li>
            </ul>
        </div>
    )
}