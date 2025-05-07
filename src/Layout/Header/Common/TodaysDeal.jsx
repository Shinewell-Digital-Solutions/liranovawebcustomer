import Btn from '@/Elements/Buttons/Btn';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiFlashlightLine } from 'react-icons/ri';
import HeaderDealModal from './HeaderDealModal';

const TodaysDeal = () => {
  const [modal, setModal] = useState(false);

  const { t } = useTranslation('common');
  return (
    <>
      {/* Todays Deal Modal */}
      <div className='header-nav-right'>
        <Btn className='btn deal-button' onClick={() => setModal(true)}>
          <div className='offer'>
            <RiFlashlightLine className='flash-icon' />
            Today's Offer
          </div>
          <span>{t('deal_today')}</span>
        </Btn>
      </div>
      <HeaderDealModal modal={modal} setModal={setModal} />


      {/* liranova css todays deal */}
      <style>
        {`
        .deal-button{
        color: white !important;
        background: #1a4b99 !important;
        border-radius: 0px !important;
        }
        .flash-icon{
        color: white;
        // animation: flash 1.5s linear infinite;
        margin-right: 15px !important;
        }
        @keyframes flash {
        0%, 100% {
          opacity: 1;
          box-shadow:0 0 10px #ff4ea0;
          scale: 1.3;
          }
        25% {
          opacity: 0.3;
        }
        50% {
          opacity: 0;
        }
        }
        `}
      </style>
    </>
  );
};

export default TodaysDeal;
