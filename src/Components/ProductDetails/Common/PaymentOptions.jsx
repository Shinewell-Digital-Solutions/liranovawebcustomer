import { useContext } from 'react';
import Image from 'next/image';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';

import { useTranslation } from "react-i18next";
import LiveImagePath from '@/Utils/Constants';

const PaymentOptions = ({ productState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  return (
    <>
      {themeOption?.product?.safe_checkout && productState?.product?.safe_checkout ? (
        <div className='payment-option'>
          <div className='product-title'>
            <h4>{t("guaranteed_safe_checkout")}</h4>
            {themeOption?.product?.safe_checkout_image && <Image src={`${LiveImagePath}${themeOption?.product?.safe_checkout_image}`} alt='Safe Checkout' className='img-fluid payment-img' height={33} width={301} />}
          </div>
        </div>
      ) : null}
      {themeOption?.product?.secure_checkout && productState?.product?.secure_checkout ? (
        <div className='secure-site-sec'>
          <h4>{t("secure_checkout")}</h4>
          {themeOption?.product?.secure_checkout_image && <Image src={`${LiveImagePath}${themeOption?.product?.secure_checkout_image}`} alt='Secure Checkout' className='img-fluid payment-img' height={26} width={376} />}
        </div>
      ) : null}
    </>
  );
};

export default PaymentOptions;
