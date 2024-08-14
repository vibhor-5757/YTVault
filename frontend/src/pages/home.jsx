// import React, { useState, useEffect } from 'react';
// import './home.css'
// export function Home() {
//     const [choice, setChoice] = useState('video');
//     return (
//         <div className='home-container'>
//             <h1>download your files here</h1>
//             <div className='home-btn-container'>
//                 <button className ={choice === 'video'? 'home-btn-active' : ''} onClick={() => setChoice('video')}>video</button>
//                 <button className ={choice === 'playlist'? 'home-btn-active' : ''} onClick={() => setChoice('playlist')}>playlist</button>
//             </div>
//             <form action="/getlink">
//                 <input type="text"  placeholder={choice === 'video' ? 'enter video link' : 'enter playlist link'} />
//                 <button>enter</button>
//             </form>
//         </div>
//     );
// }


import { useState } from "react";
import axios from 'axios';
import './home.css';

export function Home() {
    const [type, setType] = useState("Video");
    // const [val, setVal] = useState("");
    const [data, setData] = useState(null);

    const handleClick = (e) => {
        e.target.classList.add("active");
    };

    const fetchData = async (val) => {
        try {
            const result = await axios.post(`http://127.0.0.1:8000/download/${val}`);
            setData(result.data);
            console.log("data: ", result.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <>
            <h1>YouTube Downloader</h1>
            <div className="btns">
                <button onClick={(e) => {
                    setType("Video");
                    handleClick(e);
                }}>Video</button>
                <button onClick={(e) => {
                    setType("Playlist");
                    handleClick(e);
                }}>Playlist</button>
            </div>
            <input type="text" placeholder={`Enter the link of ${type}`} />
            <br />
            <button onClick={() => {
                const input = document.querySelector("input");
                fetchData(input.value);
            }}>Submit</button>
            <div>
                {data && <p>{JSON.stringify(data)}</p>}
            </div>
        </>
    );
}
