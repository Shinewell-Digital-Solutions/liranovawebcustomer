'use client';

import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import Image from 'next/image';
import { Col } from 'reactstrap';
import forgotPasswordImage from '../../../../public/assets/images/inner-page/forgot.png';
import OTPVerificationForm from './OTPVerificationForm';

const OTPVerificationContent = () => {
  return (
    <>
      {/* <Breadcrumb title={'OTPVerification'} subNavigation={[{ name: 'OTPVerification' }]} /> */}
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space forgot-section', fluidClass: 'w-100' }} customCol={true}>
        {/* <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
          {forgotPasswordImage &&  <Image src={forgotPasswordImage} className='img-fluid' alt='OTPVerification' />}
          </div>
        </Col> */}

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='log-in-box new-login'>
              <div className='input-box'>
                <OTPVerificationForm />
              </div>
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

export default OTPVerificationContent;
