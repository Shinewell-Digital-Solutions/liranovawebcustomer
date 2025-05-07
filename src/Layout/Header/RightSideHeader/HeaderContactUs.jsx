import React, { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';

import { useTranslation } from "react-i18next";
import { RiCustomerServiceLine, RiLoginBoxLine } from 'react-icons/ri';

const HeaderContactUs = () => {
  const { themeOption } = useContext(ThemeOptionContext);

  const { t } = useTranslation('common');
  return (
    <>

    {/* --------------------------header login icon component -------------------------- */}
      {themeOption?.header?.support_number &&
        <li className='right-side'>

          {/* <a className='delivery-login-box'>
            <div className='delivery-icon login-icon' title='Login'>
              <RiLoginBoxLine />
            </div>
            <div className='delivery-detail'>
              <h6>{t('24/7Delivery')}</h6>
              <h5>{themeOption?.header?.support_number}</h5>
            </div>
          </a> */}
        </li>
      }
    </>
  );
};

export default HeaderContactUs;
