'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Col } from 'reactstrap';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import signUpImage from '../../../../public/assets/images/inner-page/sign-up.png';
import { useTranslation } from "react-i18next";
import RegisterForm from './RegisterForm';
import AuthHeadings from '../Common/AuthHeadings';
import SettingContext from '@/Helper/SettingContext';
import { useContext } from 'react';

const RegisterContent = () => {
  const { t } = useTranslation('common');
  const { settingData } = useContext(SettingContext);
  return (
    <>
      {/* <Breadcrumb title={'register'} subNavigation={[{ name: 'register' }]} /> */}
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space', fluidClass: 'w-100' }} customCol={true}>
        {/* <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
          {signUpImage &&  <Image src={signUpImage} className='img-fluid' alt='sign-up' height={465} width={550} />}
          </div>
        </Col> */}

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='log-in-box new-login'>
            <AuthHeadings heading1={`Welcome to ${settingData?.general?.site_name}`} heading2={'Create New Account'} />

            <div className='input-box'>
              <RegisterForm />
            </div>

            <div className='other-log-in'>
              <h6>{t('or')}</h6>
            </div>

            <div className='sign-up-box'>
              <h4>{t('already_have_an_account')}?</h4>
              <Link href={`/auth/login`}>{t('log_in')}</Link>
            </div>
          </div>
        </Col>
      </WrapperComponent>
      {/* liranova css new login */}
      <style>{`
      .new-login{
      // background:rgba(23, 74, 151, 0.54) !important;
      background: #174b9700 !important;
      backdrop-filter: blur(20px);
      box-shadow: 0px 0px 0px 100rem #174b972e;
      }
      `}</style>
    </>
  );
};

export default RegisterContent;
