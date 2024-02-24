import React, { useState, useEffect } from 'react';
import { collection, getDocs,getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getApps } from 'firebase/app';
import TimestampDisplay from './TimestampDisplay';
import './style.css'
import TemperatureChart from './TemperatureChart';

function Table({clickedButton}) {
  const [snapshotData, setSnapshotData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const firebaseConfig = {

    apiKey: "AIzaSyC_G5iVbMULeqjrifKZ9ouAIEXEUBfOQSU",
  
    authDomain: "aqm-iot-9254b.firebaseapp.com",
  
    databaseURL: "https://aqm-iot-9254b-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "aqm-iot-9254b",
  
    storageBucket: "aqm-iot-9254b.appspot.com",
  
    messagingSenderId: "1048771851044",
  
    appId: "1:1048771851044:web:d05400c8a6107c0d5ff9b1",
  
    measurementId: "G-P1ME4EGQ2Q"
  
  };
  
  
  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const firestore = getFirestore(app); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'iot-aiq'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSnapshotData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [firestore]);
  

  return (
    <div>
        <TemperatureChart data={snapshotData} lable={clickedButton} />
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      {snapshotData.length > 0 && (
        <table id='customers'>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Air Quality</th>
            </tr>
          </thead>
          <tbody>
            {snapshotData.map((data) => (
              <tr key={data.id}>
               <td> <TimestampDisplay timestamp={data.timestamp} /> </td>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
                <td>{data.airQuality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {snapshotData.length === 0 && <p>No data available.</p>}
    </div>
  );
}

export default Table;
