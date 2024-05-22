import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import './App.css';
import ApexChart from './ApexChart';

const App = () => {
  const canvasRef = useRef(null);
  const [guess, setGuess] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSubmit();
    }, 100); // 100ms = a tenth of a second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async () => {
    const canvas = canvasRef.current.getCanvas();
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'drawing.png');

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setGuess(response.data.guess);
        setPrediction(response.data.confidence);
      } catch (error) {
        console.error('Error uploading the drawing:', error);
      }
    }, 'image/png');
  };

  const handleClear = () => {
    canvasRef.current.clear();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            Menu <span>&#9660;</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <a href="https://www.kaggle.com/datasets/hojjatk/mnist-dataset" target="_blank" rel="noopener noreferrer">MNIST Dataset</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="title-container">
        <h1>Digit Detector</h1>
        <p className="subtitle">Explore an artificial intelligence that can recognize and classify handwritten digit images into their corresponding numerical values</p>
      </div>
      <div className="Click-container">
        <p className="subtitle">Draw a digit!</p>
      </div>
      <div className="canvas-container">
        <SignatureCanvas
          ref={canvasRef}
          penColor="black"
          minWidth={7}
          canvasProps={{ width: 200, height: 200, className: 'sigCanvas' }}
        />
        <div className="info-box">
          <p>{guess}</p> {/* Insert text to appear on white box */}
        </div>

      </div>
      <div className="button-container">
        <button onClick={handleClear} className="button">Clear</button>
      </div>
      <div className="chart-container">
        <ApexChart prediction={prediction} />
      </div>

      <div className="contact-info" style={{ backgroundImage: 'url(/path/to/bg2.png)' }}>
        <p>By Aditya Nair & Ryan Yavari</p>
      </div>
    </div>
  );
};

export default App;