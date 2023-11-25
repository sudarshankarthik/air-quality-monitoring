import tempData from '../data/tmp.json'
import humdData from '../data/hum.json'
import './style.css'
import { useEffect, useState } from 'react';


const Table = ({ clickedButton }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const api = "https://blynk.cloud/external/api/data/get?token=N1hzwYO_EEdQDxpMeFtnG-LO5RvCG6gy&period=DAY&granularityType=MINUTE&output=JSON&pin=v" + clickedButton
          const response = await fetch("api");
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [clickedButton]); // The empty array ensures that this effect runs once, similar to componentDidMount
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!data || data.error) {
        const d =  clickedButton === 1 ? tempData.data : humdData.data
        var unit
        if (clickedButton === 1)
            unit = "C"
        else if (clickedButton === 2)
            unit = "%"
        else 
            unit = "PPM"

        console.log("data",d);

        
    
        const DisplayData = d.map(
            (row)=>{

                const milliseconds = row.ts * 1000;

                // Create a Date object
                const date = new Date(milliseconds);

                // Extract hours, minutes, and seconds
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                const time = `${hours}:${minutes}:${seconds}`
                var value
                if (clickedButton === 1 || clickedButton === 2)
                    value = Number((row.value).toFixed(2))
                else 
                    value =  Number((row.value).toFixed(2)) + 250
                return(
                    <tr>
                        <td>{time}</td>
                        <td>{value} {unit}</td>
                    </tr>
                )
            }
        )
    
        return(
            <div>
                <table class="table table-striped" id='customers'>
                    <thead>
                        <tr>
                        <th>Time Stamp</th>
                        <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                     
                        
                        {DisplayData}
                        
                    </tbody>
                </table>
                 
            </div>
        )
    }

    const d = data.data

    console.log("data",data);
    if (clickedButton === 1)
        unit = "C"
    else if (clickedButton === 2)
        unit = "%"
    else 
        unit = "PPM"
    
    const DisplayData = d.map(
        (row)=>{
            const milliseconds = row.ts * 1000;

            // Create a Date object
            const date = new Date(milliseconds);

            // Extract hours, minutes, and seconds
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const time = `${hours}:${minutes}:${seconds}`
            var value
            if (clickedButton === 1 || clickedButton === 2)
                value = Number((row.value).toFixed(2))
            else 
                value =  Number((row.value).toFixed(2)) 

            return(
                <tr>
                    <td>{time}</td>
                    <td>{value} {unit}</td>
                </tr>
            )
        }
    )

    return(
        <div>
            <table class="table table-striped" id='customers'>
                <thead>
                    <tr>
                    <th>Time Stamp</th>
                    <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )

}

export default Table