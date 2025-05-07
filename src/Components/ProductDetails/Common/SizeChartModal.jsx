import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const SizeChartModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Bras");

  const categories = ["Bras", "Panties", "Shapewear", "Lingerie"];

  const sizeCharts = {
    Bras: [
      { size: "28 A", underBust: "23.2-24.4", overBust: "28.3-29.1" },
      { size: "28 B", underBust: "23.2-24.4", overBust: "29.1-29.9" },
      { size: "28 C", underBust: "23.2-24.4", overBust: "29.9-30.7" },
      { size: "28 D", underBust: "23.2-24.4", overBust: "30.7-31.5" },
      { size: "30 A", underBust: "24.8-26.4", overBust: "30.3-31.1" },
      { size: "32 B", underBust: "26.8-28.3", overBust: "33.1-33.9" },
      { size: "34 C", underBust: "28.7-30.3", overBust: "35.8-36.6" },
      { size: "34 D", underBust: "28.7-30.3", overBust: "36.6-37.8" },
      { size: "34 H", underBust: "28.7-30.3", overBust: "46.1-47.2" },
    ],
    Panties: [
      { size: "XS", waist: "24-25", hip: "34-35" },
      { size: "S", waist: "26-27", hip: "36-37" },
      { size: "M", waist: "28-29", hip: "38-39" },
      { size: "L", waist: "30-31", hip: "40-41" },
      { size: "XL", waist: "32-34", hip: "42-44" },
    ],
    Shapewear: [
      { size: "S", waist: "25-27", hip: "35-37" },
      { size: "M", waist: "28-30", hip: "38-40" },
      { size: "L", waist: "31-33", hip: "41-43" },
      { size: "XL", waist: "34-36", hip: "44-46" },
    ],
    Lingerie: [
      { size: "S", bust: "32-33", waist: "25-26", hip: "34-36" },
      { size: "M", bust: "34-35", waist: "27-28", hip: "37-39" },
      { size: "L", bust: "36-37", waist: "29-30", hip: "40-42" },
      { size: "XL", bust: "38-39", waist: "31-33", hip: "43-45" },
    ],
  };

  return (
    <>
      <style>{`
        .size-chart-modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center;
          z-index: 999;
        }
        .size-chart-modal {
          background: #fff;
          width: 80%;
          max-width: 800px;
          display: flex;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 0 100rem rgba(0, 0, 0, 0.45);
          position: fixed;
          top: 170px;

        }
        .size-chart-modal-left {
          width: 30%;
          background: #f8f8f8;
          padding: 20px;
          border-right: 1px solid #ddd;
        }
        .size-chart-modal-right {
          width: 70%;
          padding: 20px;
          overflow-y: auto;
          max-height: 400px;
        }
        .size-chart-category-btn {
          display: block;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 10px;
          margin: 5px 0;
          font-weight: bold;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.3s;
        }
        .size-chart-category-btn:hover, .size-chart-category-btn.active {
          background: #118f79;
          color: white;
        }
        .size-chart table {
          width: 100%;
          border-collapse: collapse;
        }
        .size-chart th, td {
          padding: 8px;
          border: 1px solid #ddd;
          text-align: left;
        }
        .size-chart th {
          background: #f0f0f0;
        }
        .size-chart-close-btn {
          margin-top: 10px;
          background: #118f79;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .size-chart-open-btn {
          background: transparent;
          color: #1a4b99;
          font-size: 12px !important;
        font-weight: 500;
          border: none;
          text-transform: uppercase;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          position: relative;
        }
        .size-chart-open-btn::after {
        content: '';
        position: absolute;
        right: -8px;
        bottom: 0;
        width: 2px;
        height: 100%;
        background: #1a4b99;
        }
          
      `}</style>

      <button className="size-chart-open-btn" onClick={() => setIsOpen(true)}>Size Chart</button>

      {isOpen && (
        <div className="size-chart size-chart-modal-overlay "onClick={() => setIsOpen(false)}>
          <div className="size-chart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="size-chart-modal-left">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`size-chart-category-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="size-chart-modal-right">
              <h3>{selectedCategory} Size Chart</h3>
              <table>
                <thead>
                  <tr>
                    {Object.keys(sizeCharts[selectedCategory][0]).map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts[selectedCategory].map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="size-chart-close-btn" onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeChartModal;