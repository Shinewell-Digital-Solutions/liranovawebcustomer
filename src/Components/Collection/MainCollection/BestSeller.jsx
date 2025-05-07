import React from "react";

const Product = [
    {
        id: 1,
        name: "Best Seller",
        },
    {
        id: 2,
        name: "Low to High",
       
    },
    {
        id: 3,
        name: "High to Low",
    },
    {
        id: 4,
        name: "New Arrivals",
    },
    {
        id: 3,
        name: "Most Viewed",
    },
    {
        id: 3,
        name: "Discount",
    },
]

const BestSeller = () => {
  return (
    // best seller component
    <div className="best-seller">
      <span>Sort By:</span>

      <div className="best-seller-content">
        {Product.map((item) => (
          <div key={item.id} className="product-item">
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      {/* Add your best seller products here */}

      <style>{`
      .best-seller {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        }
        .best-seller span {
            text-wrap: nowrap;
            font-weight: bold;
            margin-right: 10px;
            font-size: 14px;
            color: #1a4b99;
            transition: all 0.3s ease;
        }
        .best-seller-content {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            transition: all 0.3s ease;
        }
            .best-seller-content span{
            text-wrap: nowrap;
            font-weight: 400;
            color: #565656;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease-in;
            }
            .best-seller-content span:hover{
            color: #1a4b99;
            transition: all 0.3s ease-in !important;
            }
            .best-seller-content span:hover::before{
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #1a4b99;
            bottom: 0px;
            left: 0;
            transition: all 0.3s ease-in;
            }
      
      `}</style>
    </div>
  );
}

export default BestSeller;