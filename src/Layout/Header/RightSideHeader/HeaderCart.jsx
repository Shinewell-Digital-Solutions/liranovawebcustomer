import React, { useContext, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn';

import HeaderCartData from './HeaderCartData';
import CartContext from '@/Helper/CartContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiShoppingCartLine } from 'react-icons/ri';

const HeaderCart = () => {
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);

  const { t } = useTranslation('common');
  const { cartProducts } = useContext(CartContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    //  header cart icon component
    <li className='right-side'>
      <div className='onhover-dropdown header-badge' title='Cart'>
        <Btn type='button' className='btn p-0 position-relative header-wishlist header-cart' onClick={() => cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas)}>
          <RiShoppingCartLine />
          {cartProducts?.length > 0 && (
            <span className='position-absolute top-0 start-100 translate-middle badge'>
              {cartProducts?.length}
              <span className='visually-hidden'>{t('unread_messages')}</span>
            </span>
          )}
        </Btn>
        <HeaderCartData cartStyle={cartStyle} />
      </div>

      {/* liranova css cart icon */}
      <style>
        {`
            .header-cart{
            padding-left: 20px !important;

            svg{
            width: 35px;
        height: 35px;
        color: black !important;
        background: #fff;
        font-size: 30px !important;
        padding: 5px;
        border: 1px solid black;
        border-radius: 50%;
        // filter: drop-shadow(0px 0px 1px #000);
        }
            }
            `}
      </style>

    </li>
  );
};

export default HeaderCart;
