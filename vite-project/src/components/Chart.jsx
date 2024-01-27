import chart from '../assets/circularprogress.png'

export default function Chart() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img src={chart} alt="chart" className="w-64 h-64" />
        </div>
    )
}