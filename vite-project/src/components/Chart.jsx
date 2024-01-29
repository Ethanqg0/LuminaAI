import React, { useState, useEffect } from 'react';
import '../index.css'
import '../keyframes.css'


export default function Chart( {title, value, backgroundColor}) {
  const [progress, setProgress] = useState(value);
  
  return (
    <>
        <div className="flex flex-col w-full items-center justify-center roboto">
        <h1 className="roboto">{title}: {progress}%</h1>
        <div style={{ width: '60%', backgroundColor: 'black'  }} className="rounded-md">
            <div style={{ width: `${progress}%` }}>
            <div className="loader" style={{backgroundColor}}></div>
            </div>
        </div>
        </div>
    </>
  )
}
