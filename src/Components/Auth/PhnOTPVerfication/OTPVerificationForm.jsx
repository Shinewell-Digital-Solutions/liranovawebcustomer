import FormBtn from '@/Components/Common/FormBtn';
import ShowBox from '@/Elements/Alerts&Modals/ShowBox';
import { obscureEmail } from '@/Utils/CustomFunctions/EmailFormates';
import usePhnOtpVerification from '@/Utils/Hooks/Auth/usePhnOtpVerification';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from 'reactstrap';

const OTPVerificationForm = () => {
  const [showBoxMessage, setShowBoxMessage] = useState();

  const code = Cookies.get('uc');
  const phone = Cookies.get('up');
  const [otp, setOtp] = useState('');
  const { t } = useTranslation('common');
  const { mutate: phnOtpVerification } = usePhnOtpVerification(setShowBoxMessage);
  const handleChange = (e) => {
    if (e.target.value.length <= 5 && !isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };
  return (
    <>
      <ShowBox showBoxMessage={showBoxMessage} />
      <Formik
        initialValues={{
          country_code: '91',
          phone: ''
        }}
        onSubmit={(values) => otp && otp.length === 5 && phnOtpVerification({
          country_code: code,
          phone: phone, token: otp
        })}>
        {() => (
          <Form className='row g-2'>
            <div className='log-in-title'>
              <h3 className='text-content'>{t('please_enter_the_one_time_password_to_verify_your_account')}</h3>
              <h5 className='text-content'>
                {t('a_code_has_been_sent_to') + ' '}
                <span>{obscureEmail(phone)}</span>
              </h5>
            </div>
            <div className='outer-otp'>
              <div className='inner-otp'>
                <Input type='text' className='no-background' maxLength='5' onChange={handleChange} value={otp} />
              </div>
            </div>
            <FormBtn title={'validate'} classes={{ btnClass: 'btn new-btn btn-animation w-100 mt-3' }} />
          </Form>
        )}
      </Formik>
      {/* liranova css login-btn */}
      <style>{`
        .new-btn {
          background: #118f79 !important;
        }
        .new-btn::before {
          background: #0f7a6a !important;
        }
      `}</style>
    </>
  );
};

export default OTPVerificationForm;
