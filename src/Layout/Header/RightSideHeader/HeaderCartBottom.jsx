import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Progress } from 'reactstrap';

import { useTranslation } from "react-i18next";
import { RiShoppingCartLine, RiTruckLine } from 'react-icons/ri';
import CartVariationModal from './CartVariationModal';
import SettingContext from '@/Helper/SettingContext';
import CartContext from '@/Helper/CartContext';
import SelectedCart from './SelectedCart';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { usePathname, useRouter } from 'next/navigation';

const HeaderCartBottom = ({ modal, setModal, shippingFreeAmt, shippingCal }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { setCartCanvas } = useContext(ThemeOptionContext);
  const [selectedVariation, setSelectedVariation] = useState('');
  const { t } = useTranslation( 'common');
  const { cartProducts, getTotal } = useContext(CartContext);
  const pathname = usePathname();
  const isAuth = Cookies.get('uaf');
  // Getting total when cartProducts changes
  const total = useMemo(() => {
    return getTotal(cartProducts);
  }, [cartProducts, modal]);

  const handelCheckout = () => {
    Cookies.set('CallBackUrl', '/checkout');
  }
  return (
    <>
      {cartProducts?.length > 0 && (
        <>
          <div className='pere-text-box success-box'>
            {shippingFreeAmt > getTotal(cartProducts) ? (
              <p>
                {t('spend')} <span className='shipping'>{convertCurrency(shippingFreeAmt - getTotal(cartProducts))}</span> {t('more_and_enjoy')} <span className='shipping'>{t('free_shipping!')}</span>
              </p>
            ) : (
              <p>
                <span className='shipping'>{t('congratulations')}!</span> {t('enjoy_free_shipping_on_us')}!
              </p>
            )}
            <Progress multi>
              {shippingCal <= 30 ? (
                <Progress striped animated color='danger' value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : shippingCal >= 31 && shippingCal <= 80 ? (
                <Progress striped animated color='warning' value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : (
                <Progress striped animated value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              )}
            </Progress>
          </div>
          <SelectedCart setSelectedVariation={setSelectedVariation} setModal={setModal} modal={modal} />
        </>
      )}
      <CartVariationModal modal={modal} setModal={setModal} selectedVariation={selectedVariation} />
      {!cartProducts?.length && (
        <div className='empty-cart-box'>
          <div className='empty-icon'>
            <RiShoppingCartLine />
          </div>
          <h5>{t('your_cart_is_currently_empty')}</h5>
        </div>
      )}
      {cartProducts?.length ? (
        <div className='bottom-box'>
          <p className='free'>{t('shipping_and_taxes_are_calculated_at_checkout')}.</p>
          <>
            <div className='price-box'>
              <h5>{t('total')} :</h5>
              <h4 className='theme-color fw-bold'>{convertCurrency(total)}</h4>
            </div>
            <div className='button-group'>
            <Link href={`/cart`} className='btn btn-sm cart-button' onClick={() => setCartCanvas('')}>
                {t('view_cart')}
              </Link>
              <Link href={'/checkout'} className='btn btn-sm cart-button theme-bg-color text-white' onClick={() => setCartCanvas(''), handelCheckout}>
                {t('checkout')}
              </Link>
            </div>
          </>
        </div>
      ) : null}
    </>
  );
};

export default HeaderCartBottom;
