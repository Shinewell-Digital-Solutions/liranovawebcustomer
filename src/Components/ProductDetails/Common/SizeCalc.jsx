import React, { useState, useEffect, useRef } from 'react';

const SizeCalc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState('cm');
  const [overBust, setOverBust] = useState('');
  const [underBust, setUnderBust] = useState('');
  const [braSize, setBraSize] = useState('');
  const popupRef = useRef(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
    setOverBust('');
    setUnderBust('');
    setBraSize('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!overBust || !underBust) return alert('Please enter all fields');

    const over = parseFloat(overBust);
    const under = parseFloat(underBust);
    const bandSize = Math.round(under);
    const cupSize = Math.round(over - under);
    const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G'];
    const cup = cupSizes[cupSize] || 'Unknown';
    const size = `${bandSize}${cup}`;
    setBraSize(size);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="bra-calculator-wrapper">
      <button className="bra-calculator-open-btn" onClick={togglePopup}>Calculate your Size</button>
      {isOpen && (
        <div className="bra-calculator-popup">
          <div className="bra-calculator-popup-inner" ref={popupRef}>
            <div className="bra-calculator-popup-header">
              <h3>Bra Size Calculator</h3>
              <div className="bra-calculator-unit-toggle">
                <button onClick={() => handleUnitChange('in')} className={unit === 'in' ? 'active' : ''}>In</button>
                <button onClick={() => handleUnitChange('cm')} className={unit === 'cm' ? 'active' : ''}>Cm</button>
              </div>
              <button className="bra-calculator-close-btn" onClick={togglePopup}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bra-calculator-input-group">
                <label>Over Bust Measurement</label>
                <div className="bra-calculator-input-section">
                <input
                  type="number"
                  value={overBust}
                  onChange={(e) => setOverBust(e.target.value)}
                  placeholder={`Enter in ${unit}`}
                />
                <span>{unit}</span>
                </div>
              </div>
              <div className="bra-calculator-input-group">
                <label>Under Bust Measurement</label>
                <div className="bra-calculator-input-section">
                <input
                  type="number"
                  value={underBust}
                  onChange={(e) => setUnderBust(e.target.value)}
                  placeholder={`Enter in ${unit}`}
                />
                <span>{unit}</span>
                </div>
              </div>
              <button type="submit" className="bra-calculator-submit-btn">Submit</button>
            </form>
            {braSize && <p className="bra-calculator-result">Estimated Bra Size: <strong>{braSize}</strong></p>}
          </div>
        </div>
      )}

      <style>{`
      /* SizeCalc.css */

.bra-calculator-wrapper {
  text-align: center;
}

.bra-calculator-open-btn {
  padding: 10px 20px;
  background-color: transparent;
  color: #1a4b99;
  font-size: 12px;
    font-weight: 500;
  text-wrap: nowrap;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.bra-calculator-popup {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.bra-calculator-popup-inner {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 0 100rem rgba(0, 0, 0, 0.3);
}

.bra-calculator-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.bra-calculator-popup-header h3 {
  margin: 0;
  font-size: 16px;
}

.bra-calculator-close-btn {
  text-align: end;
  position: absolute;
  top: -20px;
  right: -15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.bra-calculator-unit-toggle {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.bra-calculator-unit-toggle button {
  width: 50px;
  height: 25px;
  border: 1px solid #118f79;
  background-color: white;
  cursor: pointer;
  border-radius: 0px;
}

.bra-calculator-unit-toggle .active {
  background-color: #118f79;
  color: white;
}

.bra-calculator-input-group {
  margin-bottom: 15px;
  text-align: left;
}

.bra-calculator-input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
.bra-calculator-input-section{
display: flex;
justify-content: start;
align-items: center;
}
.bra-calculator-input-group input {
  width: calc(100% - 40px);
  max-width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.bra-calculator-input-group span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px !important;
  font-weight: 500;
  color: #118f79;
}

.bra-calculator-submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #118f79;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.bra-calculator-result {
  margin-top: 15px;
  font-size: 18px;
  color: #1a4b99;
}

@media (max-width: 500px) {
  .bra-calculator-popup-inner {
    width: 95%;
    padding: 15px;
  }

  .bra-calculator-unit-toggle button {
    padding: 6px 12px;
  }

  .bra-calculator-submit-btn {
    padding: 8px;
  }
}

      `}</style>
    </div>
  );
};

export default SizeCalc;

