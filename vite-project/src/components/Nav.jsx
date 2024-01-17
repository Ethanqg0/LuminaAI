import logo from '../assets/Logo.png'
import { useState } from 'react';

export default function Nav({signOut, isLoggedIn}) {
    return (
        <div className="w-full h-16 bg-black flex flex-row justify-between items-center">
            <div id="logo">
                <img src={logo} className="w-8 ml-20"/>
            </div>
            <div>
                <ul className="flex flex-row mr-20">
                    <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Home</li>
                    <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Projects</li>
                    {isLoggedIn ? (
                        <li className="mr-4 text-white hover:text-blue-400 cursor-pointer" onClick={signOut}>Logout</li>
                        ) : (
                            <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Login</li>
                            )}
                    {isLoggedIn && (
                        <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Settings</li>
                    )}
                </ul>
            </div>
        </div>
    )
}