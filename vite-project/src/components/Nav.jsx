import logo from '../assets/Logo.png'

export default function Nav() {
    return (
        <div className="w-full h-16 bg-black flex flex-row justify-between items-center">
            <div id="logo">
                <img src={logo} className="w-8 ml-20"/>
            </div>
            <div>
                <ul className="flex flex-row mr-20">
                    <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Home</li>
                    <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Projects</li>
                    <li className="mr-4 text-white hover:text-blue-400 cursor-pointer">Settings</li>
                </ul>
            </div>
        </div>
    )
}