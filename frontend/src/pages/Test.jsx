import { useState, useEffect } from 'react';
import axios from 'axios';

export function Test(link) {
    // console.log(`http://127.0.0.1:8000/download/${link.link}`)
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const result = await axios.post(`http://127.0.0.1:8000/download/${link.link}`);
        setData(result.data);
    };
    console.log("data:", data)
    
    useEffect(() => {
        fetchData();
    }, [link]);

    return (
        <div>
            {data && <p>{JSON.stringify(data)}</p>}
        </div>
    );
}