'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ShowBox from '@/Elements/Alerts&Modals/ShowBox';
import SettingContext from '@/Helper/SettingContext';
import useHandlePhnLogin from "@/Utils/Hooks/Auth/usePhnLogin";
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Col } from 'reactstrap';
import loginImage from '../../../../public/assets/images/inner-page/log-in.png';
import AuthHeadings from '../Common/AuthHeadings';
import LoginForm from './LoginForm';

const LoginContent = () => {
  const { t } = useTranslation('common');
  const [showBoxMessage, setShowBoxMessage] = useState();
  const { mutate, isLoading } = useHandlePhnLogin(setShowBoxMessage);
  const { settingData } = useContext(SettingContext);

  return (
    <>
      {/* <Breadcrumb title={'log_in'} subNavigation={[{ name: 'log_in' }]} /> */}
      <WrapperComponent classes={{ sectionClass: 'log-in-section background-image-2 section-b-space', fluidClass: 'w-100' }} customCol={true}>
        {/* <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
            {loginImage && <Image src={loginImage} className='img-fluid' alt='loginImage' height={465} width={550} />}
          </div>
        </Col> */}

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
            <ShowBox showBoxMessage={showBoxMessage} />
          <div className='log-in-box new-login'>
            <AuthHeadings heading1={`Welcome to ${settingData?.general?.site_name}`} heading2={'Login Your Account'} />
            <div className='input-box mb-2'>
              <LoginForm  mutate={mutate} isLoading={isLoading}/>
            </div>
            <div className='other-log-in'>
              <h6>{t('or')}</h6>
            </div>

            <div className='sign-up-box'>
              <h4>{t("don't_have_an_account")}?</h4>
              <Link href={`/auth/register`}>{t('sign_up')}</Link>
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

export default LoginContent;
