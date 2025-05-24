import React, { useContext } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import MainHeaderMenu from './MainHeaderMenu';
import { useTranslation } from "react-i18next";
import Link from 'next/link';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiCloseLine, RiMessage2Line, RiPhoneLine, RiMailLine, RiWhatsappLine } from 'react-icons/ri';

const ClassicHeaderMenu = () => {

  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  return (
    // hamburger menu bar 
    <div className='header-nav-middle'>
      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? 'show' : ''}`} id='primaryMenu'>
          <div className='offcanvas-header navbar-shadow'>
            <div className="header-menu-profile">
              <div className="header-menu-img">
                <img src="/assets/images/profile.png" alt="" />
              </div>
              <span>
                <h5>{t('Hi Gorgeous')}</h5>
                <p className='profile-link'>
                  <Link href={`/auth/login`}>
                    {t('Login')},
                  </Link>
                  <Link href={`/auth/register`}>
                    {t(' Register')}
                  </Link>
                </p>
              </span>
            </div>
            <Btn className='btn-close lead' type='button' onClick={() => setMobileSideBar(!mobileSideBar)}>
              <RiCloseLine />
            </Btn>
          </div>
          <div className='offcanvas-body'>
            <MainHeaderMenu />
            <div className='offcanvas-bottom-menu'>
              <div className="offcanvas-chat">
                <p><RiMessage2Line />  Chat wth us</p>
                <p><RiPhoneLine /> Call /<RiMailLine /> Email</p>
              </div>
              <div className="offcanvas-purchase">
                <p><RiWhatsappLine /> Buy on whatsapp</p></div>
            </div>
          </div>
        </div>
        {mobileSideBar && <div className={'offcanvas-backdrop fade show'} onClick={() => setMobileSideBar(!mobileSideBar)} />}
      </div>

      {/* liranova css hamburger menu */}
      <style>
        {`
        .offcanvas-body{
        height: 30px !important;
        }
        .offcanvas-bottom-menu{
        display: none;
        border-top: 1px solid black;
        justify-content: center;
        margin-top: 20px;
        }
        .profile-link{
          text-decoration: none;
        }
        @media(max-width: 1200px){
      
        .offcanvas-body{
        height: auto;
        background: white;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        }
        .offcanvas-bottom-menu{
        display: flex;
        flex-direction: column;
        border-top: 1px solid black;
        justify-content: center;
        margin-top: 20px;
        }
        .header-menu-profile{
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 10px;
        }
          .header-menu-img{
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background: #ccc;
          overflow: hidden;
          border: 1px solid black;
          }
          .header-menu-img img{
            border-radius: 50%;
            display: flex;
            width: 40px;
            height: 40px;
            margin-top: 5px;
            object-fit: cover;
          }
          .header-menu-profile h5{
            margin-bottom: 0;
            font-size: 14px !important;
            font-weight: 400 !important;
          }
            .header-menu-profile p{
            margin-bottom: 0;
            font-size: 12px !important;
            font-weight: 400 !important;
            cursor: pointer;

            a{
              text-decoration: none;
              cursor: pointer;
            }
            }
            .offcanvas-chat{
            display: flex; 
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            }
            .offcanvas-chat p{
            margin-bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;

            svg{
              font-size: 16px;
            }
            }
            .offcanvas-purchase p{
            padding: 5px 0;

             svg{
              font-size: 16px;
            }
            }

        }
        `}
      </style>
    </div>
  );
};

export default ClassicHeaderMenu;
