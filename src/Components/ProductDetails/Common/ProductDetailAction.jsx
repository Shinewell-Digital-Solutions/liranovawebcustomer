import React, { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import AddToWishlist from '@/Components/Common/ProductBox/AddToWishlist';
import AddToCompare from '@/Components/Common/ProductBox/AddToCompare';
import AddToCartButton from './AddToCartButton';
import SettingContext from '@/Helper/SettingContext';
import ProductWholesale from './ProductWholesale';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import SizeCalc from './SizeCalc';
import SizeChartModal from './SizeChartModal';
import AvailableSizes from './AvailableSizes';

const ProductDetailAction = ({ productState, setProductState, extraOption, isDisplay = true }) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { handleIncDec, isLoading } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const [totalPrice, settotalPrice] = useState(0)
  const router = useRouter();
  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    setCartCanvas(!cartCanvas)
  };
  const buyNow = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    router.push(`/checkout`);
  };
  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
    wholesalePriceCal();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };

  const wholesalePriceCal = () => {
    let wholesale = productState?.product?.wholesales?.find(value => value?.min_qty <= productState?.productQty && value?.max_qty >= productState?.productQty) || null

    if (wholesale && productState?.product.wholesale_price_type == 'fixed') {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * wholesale.value } })
    } else if (wholesale && productState?.product.wholesale_price_type == 'percentage') {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * (prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price) } })
      setProductState(prev => { return { ...prev, totalPrice: prev?.totalPrice - (prev?.totalPrice * (wholesale.value / 100)) } })
    } else {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * (prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price) } })
    }
  }

  useEffect(() => {
    wholesalePriceCal();
  }, [totalPrice])


  const Size = [
    { id: 1, name: '32B' },
    { id: 2, name: '32C' },
    { id: 3, name: '32D' },
    { id: 4, name: '32E' },
    { id: 5, name: '34B' },
    { id: 6, name: '34C' },
    { id: 7, name: '34D' },
    { id: 8, name: '34E' },
    { id: 9, name: '34F' },
    { id: 10, name: '36B' },
    { id: 11, name: '36C' },
    { id: 12, name: '36D' },
    { id: 13, name: '36E' },
    { id: 14, name: '36F' },
    { id: 15, name: '38B' },
    { id: 16, name: '38C' },
    { id: 17, name: '38D' },
    { id: 18, name: '38E' },
    { id: 19, name: '38F' },
    { id: 20, name: '40B' },
    { id: 21, name: '40C' },
    { id: 22, name: '40D' },
    { id: 23, name: '40E' },
    { id: 23, name: '42B' },
    { id: 23, name: '42C' },
    { id: 23, name: '42D' },
    { id: 23, name: '42E' },
  ]

  return (
    <>
      {/* product page detail */}
      {productState?.product?.wholesales?.length ? (
        <>
          <ProductWholesale productState={productState} />
          <h4>{'Total Price:'} <span className="theme-color">{convertCurrency(productState?.totalPrice)}</span></h4>
        </>
      ) : null
      }
      {extraOption !== false && (
        <div className="size-available">
          <AvailableSizes />
          {/* {Size.map(size => (
              <span key={size.id} className="size-available-tag">{size.name}</span>
            ))} */}

        </div>
      )}

      {!productState?.product.external_url && isDisplay &&
        <div className='note-box product-package'>
          <div className='cart_qty qty-box product-qty'>
            <InputGroup>
              <Btn type='button' className='qty-right-plus' onClick={() => updateQty(-1)}>
                <RiSubtractLine />
              </Btn>
              <Input className='input-number qty-input' type='number' value={productState?.productQty} readOnly />
              <Btn type='button' className='qty-left-minus' onClick={() => updateQty(1)}>
                <RiAddLine />
              </Btn>
            </InputGroup>
          </div>
          {extraOption !== false ? (
            <div className='wishlist-btn-group'>
              <div className="wishlist-btns">
                <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
                <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
              </div>
            </div>
          ) : null}
        </div>
      }
      <div className="size-chart-section">
        <SizeChartModal />
        <SizeCalc />
      </div>
      <AddToCartButton productState={productState} isLoading={isLoading} addToCart={addToCart} buyNow={buyNow} extraOption={extraOption} />

      {/* liranova css product page detail */}
      <style>{`
    .wishlist-btn-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    }
    .wishlist-btns{
    display: flex;
    gap: 10px;
    }
    .size-chart-section{
      display: flex;
      justify-content: start ;
      align-items: center;
      margin-top: 10px;
    }
    .product-size-availables h4{
    padding: 15px 0;
    font-size: 16px !important;
    font-weight: 600;
    color: #1a4b99;
    }
    

      .product-size-available .size-available-tag{
      background: transparent;
      border: .5px solid #1a4b99;
      padding: 10px;
      border-radius: 5px;
      min-width: 50px;
      min-hegiht: 60px !important;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in;
      &:hover{
      background: #1a4b99;
      cursor: pointer;
      color: #fff;
      }
      }
      .offer-top{
      color: #118f79 !important;
      background:rgba(17, 143, 122, 0.09) !important; 
      }
    `}</style>

    </>
  );
};

export default ProductDetailAction;
