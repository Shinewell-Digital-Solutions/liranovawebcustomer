'use client';

import React, {
  useContext,
  useState,
  useRef,
  useEffect
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import WrapperComponent from './WrapperComponent';
import { RiHome3Fill } from 'react-icons/ri';
import FilterSort from '../Collection/MainCollection/FilterSort';
import FilterModal from '../Collection/MainCollection/FilterProduct';
import Bestseller from '../Collection/MainCollection/BestSeller';

const Breadcrumb = ({ title, subNavigation }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const banner = {
    backgroundImage: 'url(/assets/images/mega-menu2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    marginTop: '20px',
  };

  const [tagName] = useState([
    { tagname: 'Bra' }, { tagname: 'Best Sellers' }, { tagname: 'New Arrivals' }, { tagname: 'Sale' },
    { tagname: 'Trending' }, { tagname: 'Top Rated' }, { tagname: 'Best quality' }, { tagname: 'Best price' },
    { tagname: 'Top brand' }, { tagname: 'Bra' }, { tagname: 'Best Sellers' }, { tagname: 'New Arrivals' },
    { tagname: 'Sale' }, { tagname: 'Trending' }, { tagname: 'Top Rated' }, { tagname: 'Best quality' },
    { tagname: 'Best price' }, { tagname: 'Top brand' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort Category");
  const dropdownRef = useRef(null);
  const [activeTags, setActiveTags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const options = [
    "Top Rated",
    "Most Viewed",
    "Highest Selling",
    "New Arrival",
    "Low to High",
    "High to Low"
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagClick = (index) => {
    if (!activeTags.includes(index)) {
      setActiveTags([...activeTags, index]);
    }
  };

  const handleDeactivateTag = (indexToDeactivate) => {
    setActiveTags((prev) => prev.filter((i) => i !== indexToDeactivate));
  };

  const handleChipClick = (category, value) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category] || [];
      const isSelected = categoryFilters.includes(value);
      const updatedFilters = isSelected
        ? categoryFilters.filter(item => item !== value)
        : [...categoryFilters, value];
      return { ...prev, [category]: updatedFilters };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setActiveTags([]);
  };
  const pathname = usePathname();
  const isProductDetailPage = pathname.includes('/product/');
  
  return (
    <WrapperComponent classes={{ sectionClass: 'breadcrumb-section pt-0' }} colProps={{ md: 12 }}>
      <div className="breadcrumb-banner" style={banner}></div>

      <div className="breadcrumb-contain">
        <div className="breadcrumb-child">
          <nav>
            <ol className='breadcrumb mb-0'>
              <li className='breadcrumb-item'>
                <Link href='/'>Home</Link>
              </li>
              {subNavigation?.map((result, i) => (
                <li className='breadcrumb-item active text-capitalize' key={i}>
                  {t(result?.name)}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* {subNavigation?.map((result, i) => (
          <h2 className='breadcrumb-item active text-capitalize' key={i}>
            {t(result?.name)}
          </h2>
        ))} */}

        {!isProductDetailPage && (
          <div className="breadcrumb-child">
            <div className="breadcrumb-product">
              No. of products: {subNavigation?.length}
            </div>
          </div>
        )}
      </div>

      <div className="product-filters">
        <div className="product-filter-tags">
          {tagName.map((tag, index) => {
            const isActive = activeTags.includes(index);
            return (
              <div
                className="product-filter-tag"
                key={index}
                onClick={() => handleTagClick(index)}
                style={{
                  position: 'relative',
                  backgroundColor: isActive ? '#1a4b99' : 'white',
                  color: isActive ? 'white' : '#3a3a3a',
                }}
              >
                <h4 style={{ margin: 0 }}>{tag.tagname}</h4>
                {isActive && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeactivateTag(index);
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="product-filter-categories">
        <Bestseller />
        <div className="product-filter-category">
          <FilterModal
            selectedFilters={selectedFilters}
            handleChipClick={handleChipClick}
            handleClearAll={handleClearAll}
          />
        </div>
      </div>

      {(Object.values(selectedFilters).flat().length > 0 || activeTags.length > 0) && (
        <div className="selected-product">
          <div className="selected-product-tag">
            <h4>Selected:</h4>
            <div className="selected-product-scrollbar">
              <div className="selected-product-scroll">
                {[
                  ...Object.entries(selectedFilters).flatMap(([category, values]) =>
                    values.map(value => ({
                      key: `${category}-${value}`,
                      label: value,
                      onClick: () => handleChipClick(category, value)
                    }))
                  ),
                  ...activeTags.map(index => ({
                    key: `active-${index}`,
                    label: tagName[index].tagname,
                    onClick: () => handleDeactivateTag(index)
                  }))
                ].map(item => (
                  <div key={item.key} className="selected-product-tag-item">
                    <h4>{item.label}</h4>
                    <button
                      onClick={item.onClick}
                      className="clear-button"
                      style={{
                        marginLeft: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleClearAll} className='clear-button'>
            Clear All ✕
          </button>
        </div>
      )}
    
      {/* liranova css breadcrumb */}

      <style>{`
      
      .breadcrumb-section{
      background-color: white !important;
      }
      .section-b-space{
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      }
      .breadcrumb-contain{
      width: 100% !important;
      display: flex !important;
      justify-content: space-between;
      gap: 20px;
      padding: 10px 0 !important;
      padding-bottom: 0 !important;
      }
      .breadcrumb-contain li{
       font-size: 10px !important;
       font-weight: 400 !important;
       color: #333333 !important;
       letter-spacing: 0.5px !important;
      }

      .product-filters{
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      }
      .product-filter-tags{
      width: auto;
      display: flex;
      flex-direction: row;
      overflow-X: scroll !important;
      gap: 10px;
      padding: 5px 0 0 0;
      }
      .product-filter-tags::-webkit-scrollbar{
      display: none;
      }

      .product-filter-tag{
      width: auto;
      border: .5px solid #1a4b99;
      color: #ccc;
      padding: 5px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 20px;
      gap: 10px;
      flex-grow: 1;
      cursor: pointer;
      }

      .product-filter-tag h4{
      text-wrap: nowrap;
      font-size: 14px;
      font-weight: 300;
      // color: #3a3a3a;
      
      }
      
      .product-filter-tag span{
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;
      }

      .selected-product{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        padding: 5px 0;
        }
        
          .selected-product-tag{
      display: flex;
      gap: 10px !important;
      justify-content: start;
      align-items: center;
        }
      .selected-product-tag-item{
        border:1px solid  #1a4b99;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        padding: 0px 10px;
        font-size: 12px;
        font-weight: 200;
        transition: .3s ease-in;
        cursor: context-menu;
        &:hover{
        color: #1a4b99;
        }
        }
        .selected-product-tag-item h4{
          font-size: 12px;
          font-weight: 300;
          text-wrap: nowrap;
      }
        .selected-product .clear-button{
        color: #3a3a3a;
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: .3s ease-in;
        &:hover{
        color: #1a4b99;
        }
        }

        .product-filter-categories{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0 0 0;
        border-bottom: 1px solid #ccc;
        }
        .product-filter-category{
        display: flex;

        }

        .selected-product-scrollbar{
        width: 100%;
        max-width: 1100px !important;
        overflow-x: auto;
        }
        .selected-product-scrollbar::-webkit-scrollbar{
        display: none;
        }
        .selected-product-scroll{
        display: flex;
        gap: 10px;
        padding: 10px 0;
        flex-wrap: nowrap;
      }

      @media (max-width: 768px) {
      .breadcrumb-banner{
      height: 200px !important;
      }
      }
      @media (max-width: 500px) {
      .breadcrumb-banner{
      height: 150px !important;
      }
      }
      @media (max-width: 375px) {
      .breadcrumb-banner{
      height: 100px !important;
      }
      }

      `}</style>
    </WrapperComponent>
  );
};

export default Breadcrumb;

