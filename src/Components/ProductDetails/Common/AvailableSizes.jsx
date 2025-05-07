import React, { useState } from 'react';

const AvailableSizes = () => {
    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = [
        { label: '32B', disabled: false },
        { label: '32C', disabled: false },
        { label: '32D', disabled: false },
        { label: '32E', disabled: true },
        { label: '34B', disabled: false },
        { label: '34C', disabled: false },
        { label: '34D', disabled: false },
        { label: '34E', disabled: true },
        { label: '34F', disabled: true },
        { label: '36B', disabled: false },
        { label: '36C', disabled: false },
        { label: '36D', disabled: false },
        { label: '36E', disabled: true },
        { label: '36F', disabled: true },
        { label: '38B', disabled: false },
        { label: '38C', disabled: false },
        { label: '38D', disabled: false },
        { label: '38E', disabled: true },
        { label: '38F', disabled: true },
        { label: '40B', disabled: false },
        { label: '40C', disabled: true },
        { label: '40D', disabled: false },
        { label: '40E', disabled: false },
        { label: '42B', disabled: false },
        { label: '42C', disabled: false },
        { label: '42D', disabled: false },
        { label: '42E', disabled: false },
    ];

    const handleClick = (size) => {
        if (!size.disabled) {
            setSelectedSize(size.label);
        }
    };

    return (
        <div className="size-wrapper">
            <h2 className="size-title">Available Sizes</h2>
            <div className="size-buttons">
                {sizes.map((size) => (
                    <button
                        key={size.label}
                        className={`size-btn ${size.disabled ? 'disabled' : ''} ${selectedSize === size.label ? 'selected' : ''
                            }`}
                        onClick={() => handleClick(size)}
                        disabled={size.disabled}
                    >
                        {size.label}
                    </button>
                ))}
            </div>

            <style>{`
      .size-wrapper {
  max-width: 700px;
  padding: 0;
  background: #fff;
  font-family: sans-serif;
}

.size-title {
color: #1a4b99;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  margin-top: 10px;
}

.size-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-btn {
  padding: 5px 15px;
  border: .2px solid #1a4b99;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  background-color: white;
  color: #1a4b99;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-btn:hover:not(.disabled):not(.selected) {
  background-color: #1a4b99;
  color: white;
  
}

.size-btn.selected {
  background-color: #118f79;
  color: white;
  border-color: #118f79;
}

.size-btn.disabled {
  background-color: #f5f5f5;
  color: #626262;
  border-color: #626262;
  cursor: not-allowed;
  position: relative;
  overflow: hidden;
}
  .size-btn.disabled::before {
  content: '';
    position: absolute;
    top: -26px;
    left: 20px;
    width: 1px;
    height: 90px;
    background:rgba(66, 66, 66, 0.44);
    rotate: 61deg;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.size-selected {
  margin-top: 15px;
  color: green;
  font-size: 14px;
}

      `}</style>
        </div>
    );
};

export default AvailableSizes;
