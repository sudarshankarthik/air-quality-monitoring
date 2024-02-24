// import React from 'react'
// import tempData from './data/tmp.json'
// import humdData from './data/hum.json'
import React, { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  onValue,
  get,
} from 'firebase/database'; // Import from 'firebase/database'
import { initializeApp } from 'firebase/app';
import { getApps } from 'firebase/app';
import {getFirestore, addDoc, collection} from 'firebase/firestore'



// Initialize Firebase (replace with your config)
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
const db = getDatabase(app); 
const firestore = getFirestore(app);

console.log(app,db,firestore);

const Dashbord = ({ onClick }) => {
  const [recentTmp, setRecentTmp] = useState(null);
  const [recentHum, setRecentHum] = useState(null);
  const [recentAQ, setRecentAQ] = useState(null);

  useEffect(() => {
    // Fetch initial data
    fetchInitialData();

    // Attach listeners for real-time   updates
    const tmpRef = ref(db, "Temperature");
    onValue(tmpRef, (snapshot) => {
      setRecentTmp(snapshot.val());
    });

    const humRef = ref(db, "Humidity");
    onValue(humRef, (snapshot) => {
      setRecentHum(snapshot.val());
    });

    const aqRef = ref(db, "Air_Quality"); // Assuming air quality data is at 'airQuality'
    onValue(aqRef, (snapshot) => {
      setRecentAQ(snapshot.val());
    });
  }, []);

  const fetchInitialData = async () => {
    const tmpSnapshot = await get(ref(db, "Temperature"));
    setRecentTmp(tmpSnapshot.val());

    const humSnapshot = await get(ref(db, "Humidity"));
    setRecentHum(humSnapshot.val());

    const aqSnapshot = await get(ref(db, "Air_Quality"));
    setRecentAQ(aqSnapshot.val());
  };

  useEffect(() => {
    const handleDataChange = async () => {
      try {
        const tmpSnapshot = await get(ref(db, 'Temperature'));
        const humSnapshot = await get(ref(db, 'Humidity'));
        const aqSnapshot = await get(ref(db, 'Air_Quality'));

        const timestamp = new Date(); // Get current timestamp

        const snapshotData = {
          temperature: tmpSnapshot.val(),
          humidity: humSnapshot.val(),
          airQuality: aqSnapshot.val(),
          timestamp,
        };

        await addDoc(collection(firestore, 'iot-aiq'), snapshotData);
      } catch (error) {
        console.error('Error saving snapshot to Firestore:', error);
      }
    };

    // Attach listeners for real-time updates and trigger snapshot saving
    onValue(ref(db, 'Temperature'), handleDataChange);
    onValue(ref(db, 'Humidity'), handleDataChange);
    onValue(ref(db, 'Air_Quality'), handleDataChange);
  }, []);

  return (
    <div className="dashbord">
      <div className="tmp-card card" onClick={() => onClick(1)}>
        <div className="card-content">
          <h1>Temperature</h1>
          <h2>{recentTmp} C</h2>
        </div>
      </div>

      <div className="hum-card card" onClick={() => onClick(2)}>
        <div className="card-content">
          <h1>Humidity</h1>
          <h2>{recentHum} %</h2>
        </div>
      </div>

      <div className="air-card card" onClick={() => onClick(3)}>
        <div className="card-content">
          <h1>Air Quality</h1>
          <h2>{recentAQ}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
