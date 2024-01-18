import { useState } from "react";
import Dashbord from "./Dashbord";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [clickedButton, setClickedButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };


  return (
    <div className="App">
        <Navbar />
        <Dashbord  onClick={handleButtonClick}/>
        <Table clickedButton={clickedButton}/>
        
        <Footer />
    </div>
  );
}

export default App;
