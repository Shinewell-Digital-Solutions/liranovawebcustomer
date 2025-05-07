import React, { useState, useRef, useEffect } from 'react';
import { RiEqualizerFill, RiTextSpacing } from 'react-icons/ri';

const filterCategories = [
  'Size', 'Color', 'Style', 'Activity', 'Collection',
  'Coverage', 'Fabric', 'Fit', 'Offers'
];

const filterOptions = {
  Size: ['44F (23)', '46B (2)', '46C (1)', '3XL (85)', 'L (170)', 'M (152)', 'S (175)', 'XL (189)', 'XS (2)', 'XXL (203)'],
  Color: ['Black', 'Red', 'Pink', 'Beige'],
  Style: ['Padded', 'Non Padded'],
  Activity: ['Yoga', 'Running'],
  Collection: ['Summer', 'Winter'],
  Coverage: ['Full', 'Medium'],
  Fabric: ['Cotton', 'Lycra'],
  Fit: ['Slim', 'Loose'],
  Offers: ['Discounted', 'Buy 1 Get 1']
};

export default function FilterModal({ selectedFilters, handleChipClick, handleClearAll }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Size');
  const modalRef = useRef();

  const handleClose = () => setOpen(false);

  const isSelected = (category, value) => {
    return selectedFilters[category]?.includes(value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>

    {/* filter modal section */}
      <div className="filter-modal-btn">
        <button className="filter-btn" onClick={() => setOpen(true)}>
          <RiTextSpacing /> Size {Object.values(selectedFilters).flat().length > 0 && `(${Object.values(selectedFilters).flat().length})`}
        </button>
        <button className="filter-btn" onClick={() => setOpen(true)}>
          <RiEqualizerFill /> Show Filters {Object.values(selectedFilters).flat().length > 0 && `(${Object.values(selectedFilters).flat().length})`}
        </button>
      </div>

      {open && (
        <div className="filter-overlay">
          <div className="filter-modal" ref={modalRef}>
            <div className="filter-header">
              <h3>Filter By</h3>
              <span className="close-btn" onClick={handleClose}>✕</span>
            </div>

            <div className="filter-body">
              <div className="filter-sidebar">
                {filterCategories.map((cat, i) => (
                  <div
                    key={i}
                    className={`filter-category ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.toUpperCase()}
                  </div>
                ))}
              </div>

              <div className="filter-content">
                <h4>{selectedCategory}</h4>

                <div className="filter-options">
                  {filterOptions[selectedCategory]?.map((opt, i) => (
                    <span
                      key={i}
                      className={`filter-chip ${isSelected(selectedCategory, opt) ? 'selected' : ''}`}
                      onClick={() => handleChipClick(selectedCategory, opt)}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-footer">
              <button className="clear-btn" onClick={handleClearAll}>Clear All</button>

              <div className="footer-selected-filters">
                {Object.entries(selectedFilters).flatMap(([category, values]) =>
                  values.map(value => (
                    <span key={`${category}-${value}`} className="selected-chip">
                      {value}
                      <button onClick={() => handleChipClick(category, value)}>×</button>
                    </span>
                  ))
                )}
              </div>

              <div>
                <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                <button className="apply-btn" onClick={handleClose}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* liranova css filter modal */}
      <style>{`

      .filter-modal-btn {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .filter-modal-btn button{
      background: transparent;
      color: #1a4b99 !important;
      border: none;
      padding: 5px;
      font-size: 14px;
      font-weight: 600;
      }


.filter-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.filter-modal {
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-in-out;
  background-color: white;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.filter-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
}

.close-btn {
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.filter-body {
  display: flex;
  overflow-y: auto;
  flex-grow: 1;
}

.filter-sidebar {
  width: 30%;
  background-color: #f9f9f9;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.filter-category {
  padding: 8px 5px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
}

.filter-content {
  padding: 20px;
  width: 70%;
  overflow-y: auto;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-chip {
  padding: 2px 15px;
  border: 1px solid #1a4b99;
  border-radius: 30px;
  font-size: 14px;
  color: #1a4b99;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 10px;
}

.filter-chip:hover {
  background-color: #1a4b99;
  color: white;
}

.filter-footer {
  padding: 15px 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  background: transparent;
  border: none;
  color: #1a4b99;
  cursor: pointer;
  font-size: 15px;
}

.cancel-btn,
.apply-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background: #eee;
  color: #333;
}

.apply-btn {
  background-color: #1a4b99;
  color: white;
}
  .filter-category.active {
  background-color: #1a4b99;
  color: white;
  font-weight: bold;
}

.filter-chip.selected {
  background-color: #1a4b99;
  color: white;
  border-color: #1a4b99;
}

.selected-filters-right {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.selected-chip {
  background-color: #eee;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ccc;
}

.selected-chip button {
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
  .filter-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-top: 1px solid #ccc;
  background: #f9f9f9;
  flex-wrap: nowrap;
}

.footer-selected-filters {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  flex: 1;
  padding: 6px 0;
  scroll-behavior: smooth;
}

.footer-selected-filters::-webkit-scrollbar {
  display: none;
}

.selected-chip {
  background-color: #eee;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #ccc;
  white-space: nowrap;
}

.selected-chip button {
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
/* Adjust modal layout for small screens */
@media (max-width: 768px) {
  .filter-body {
    flex-direction: column;
  }

  .filter-sidebar,
  .filter-content {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .filter-modal {
    height: 95vh;
    width: 95vw;
  }

  .filter-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-selected-filters {
    width: 100%;
  }

  .filter-chip,
  .selected-chip {
    font-size: 13px;
    padding: 5px 12px;
  }

  .cancel-btn,
  .apply-btn {
    width: 100%;
    margin: 5px 0;
  }

  .filter-modal-btn {
    gap: 5px;
  }
}

/* Smaller mobile screens */
@media (max-width: 480px) {
  .filter-header {
    font-size: 16px;
    padding: 12px 15px;
  }

  .close-btn {
    font-size: 18px;
  }

  .filter-category {
    font-size: 13px;
  }

  .filter-options {
    gap: 8px;
  }

  .filter-chip {
    font-size: 12px;
    padding: 4px 10px;
  }

  .selected-chip {
    font-size: 12px;
    padding: 4px 8px;
  }

  .clear-btn {
    font-size: 14px;
  }

  .filter-content {
    min-height: 300px;
  }
}

/* Ensure the overlay always fits screen size */
.filter-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
}

/* Make filter options scrollable if too many */
.filter-options {
  max-height: 200px;
  overflow-y: auto;
  padding-right: 5px;
}

.filter-options::-webkit-scrollbar {
  width: 6px;
}

.filter-options::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.footer-selected-filters {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
  



      `}</style>
    </>
  );
}
