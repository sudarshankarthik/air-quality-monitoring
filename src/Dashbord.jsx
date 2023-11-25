import React from 'react'
import tempData from './data/tmp.json'
import humdData from './data/hum.json'

const Dashbord = ({ onClick }) => {

    const recentTmp = tempData.data[0].value
    const recentHum = humdData.data[0].value

  return (
    <div className='dashbord'>
        <div className='tmp-card card' onClick={() => onClick(1)}>
            <div className='card-content'>
                <h1>Temperature</h1>
                <h2>{recentTmp} C</h2>
            </div>
        </div>

        <div className='hum-card card' onClick={() => onClick(2)}>
            <div className='card-content'>
                <h1>Humidity</h1>
                <h2>{recentHum} %</h2>
            </div>
        </div>

        <div className='air-card card' onClick={() => onClick(3)}>
            <div className='card-content'>
                <h1>Air Quality</h1>
                <h2>322 PPM</h2>
            </div>
        </div>  

    </div>
  )
}

export default Dashbord