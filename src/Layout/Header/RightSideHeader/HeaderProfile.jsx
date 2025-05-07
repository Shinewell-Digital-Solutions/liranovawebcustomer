import Avatar from '@/Components/Common/Avatar';
import ConfirmationModal from '@/Components/Common/ConfirmationModal';
import AccountContext from '@/Helper/AccountContext';
import { LogoutAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiLogoutBoxRLine, RiUserLine } from 'react-icons/ri';

const HeaderProfile = ({ extraClass }) => {

  const router = useRouter();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [modal, setModal] = useState(false);
  const isAuthenticated = Cookies.get('uaf');
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, 'No', () => {
    setAccountData();
    Cookies.remove('uaf');
    Cookies.remove('ue');
    Cookies.remove('account');
    Cookies.remove('CookieAccept');
    localStorage.removeItem('account');
    localStorage.removeItem('role');
    Cookies.remove("CallBackUrl")
    router.push(`/`);
    setModal(false);
  });

  const handleLogout = () => {
    mutate({});
  };
  return (
    <>
      {/* header profile icon */}

      <li className='right-side onhover-dropdown login-profile'>
        <div className='delivery-login-box' title='Login'>
          <div className={`delivery-icon ${extraClass ? extraClass : ""}`}>
            {accountData?.profile_image?.original_url ? (
              <Avatar data={accountData?.profile_image} customeClass='user-box me-2' customImageClass='img-fluid' />
            ) : accountData?.name ? (
              <div className='user-box'>
                <h3>{accountData?.name?.charAt(0)?.toString()?.toUpperCase()}</h3>
              </div>
            ) : (
              <RiUserLine />
            )}
          </div>
          <div className='delivery-detail'>
            <h6>
              {' '}
              {t('hi')}, {accountData?.name ?? t('guest')}
            </h6>
            <h5>{t('my_account')}</h5>
          </div>
          <p className='profileText'>Hey User!</p>
        </div>

        <div className='onhover-div onhover-div-login'>
          <ul className='user-box-name'>
            {isAuthenticated ? (
              <>
                <li className='product-box-contain'>
                  <Link href={`/account/dashboard`}>
                    <RiUserLine className='me-2' /> {t('my_account')}
                  </Link>
                </li>
                <li className='product-box-contain' onClick={() => setModal(true)}>
                  <a>
                    <RiLogoutBoxRLine className='me-2' /> {t('log_out')}
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='product-box-contain'>
                  <Link href={`/auth/login`}>{t('log_in')}</Link>
                </li>

                <li className='product-box-contain'>
                  <Link href={`/auth/register`}>{t('register')}</Link>
                </li>
              </>
            )}
            <ConfirmationModal modal={modal} setModal={setModal} confirmFunction={handleLogout} isLoading={isLoading} />
          </ul>
        </div>
      </li>

      {/* liranova css header profile icon */}
      <style>
        {`

        .login-profile{
        border-right: 1px solid #ccc;
        cursor: pointer !important;
        
        
        svg{
          width: 35px;
          height: 35px;
          color: black !important;
          background: #fff;
          cursor: pointer !important;
          font-size: 34px !important;
          border: 1px solid black;
          padding: 5px;
          border-radius: 50%;
          // filter: drop-shadow(0px 0px 1px #000);
          }
          }
          .profileText{
            cursor: pointer !important;
        font-size: 12px;
        font-weight: 500;
        background:#1a4b99;
        color: white;
        padding: 2px 5px;
        border-radius: 10px 10px 10px 0;
        animation: slideup 1s ease-in-out infinite;
        position: relative;
        }
        @keyframes slideup {
        0% {
        transform: translateY(0);
        }
        50% {
        transform: translateY(-5px);
        }
        100% {
        transform: translateY(0);
        }
        }
        .profileText::before{
        content: '';
        position: absolute;
        width: 15px;
        height: 10px;
        background: #1a4b99;
        bottom: -3px;
        left: -4px;
        clip-path: polygon(25% 0, 9% 100%, 100% 41%);
        }

        
  header .top-nav .navbar-top .rightside-box .right-side-menu .right-side {
    position: relative; 
    padding-right: 20px;
    cursor: pointer;
}
    header .top-nav .navbar-top .rightside-box .right-side-menu .right-side::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0px;
  height: 24px;
  right: 50px;
  background-color: #ddd;
}
`}
      </style>
    </>
  );
};

export default HeaderProfile;
