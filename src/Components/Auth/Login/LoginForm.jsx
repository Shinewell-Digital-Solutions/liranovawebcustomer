import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import SettingContext from '@/Helper/SettingContext';
import { YupObject, emailSchema, loginPasswordSchema } from '@/Utils/Validation/ValidationSchemas';
import { ErrorMessage, Form, Formik } from 'formik';
import Link from 'next/link';
import { useContext, useRef, useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from "react-i18next";
import { Col, Input, Label } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ mutate, isLoading }) => {
  const { t } = useTranslation('common');
  const { settingData } = useContext(SettingContext);
  const reCaptchaRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  // Toggle input type via DOM
  useEffect(() => {
    const input = document.querySelector('input[name="password"]');
    if (input) {
      input.type = showPassword ? 'text' : 'password';
    }
  }, [showPassword]);

  return (
    <>
      {/* liranova login page */}
      <Formik
        initialValues={{
          email: '',
          password: '',
          recaptcha: ''
        }}
        validationSchema={YupObject({
          email: emailSchema,
          password: loginPasswordSchema,
          recaptcha: settingData?.google_reCaptcha?.status ? recaptchaSchema : ""
        })}
        onSubmit={mutate}>
        {({ errors, touched, setFieldValue }) => (
          <Form className='row g-4 position-relative'>

            <SimpleInputField
              nameList={[
                { name: 'email', placeholder: t('enter_email_address'), title: 'email', label: 'email_address' },
              ]}
            />

            <Col xs='12'>
              <div className='new-password-field'>
                <SimpleInputField
                  nameList={[
                    {
                      name: 'password',
                      placeholder: t('enter_password'),
                      type: 'password',
                      title: 'password',
                      label: 'password'
                    },

                  ]}
                />
                <div
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </Col>


            {settingData?.google_reCaptcha?.status &&
              <Col sm="12">
                <ReCAPTCHA
                  ref={reCaptchaRef}
                  sitekey={settingData?.google_reCaptcha?.site_key}
                  onChange={(value) => {
                    setFieldValue('recaptcha', value);
                  }}
                />
                {/* {errors.recaptcha && touched.recaptcha && <ErrorMessage name="recaptcha" render={(msg) => <div className="invalid-feedback d-block">{errors.recaptcha}</div>} />} */}
              </Col>
            }
            <Col xs={12}>
              <div className='forgot-box'>
                <div className='form-check remember-box'>
                  <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                  <Label className='form-check-label' htmlFor='flexCheckDefault'>
                    {t('remember_me')}
                  </Label>
                </div>
                <Link href={`/auth/forgot-password`} className='forgot-password'>
                  {t('forgot_password')}?
                </Link>
              </div>
            </Col>
            <FormBtn title={'log_in'} classes={{ btnClass: 'btn new-btn btn-animation w-100' }} loading={isLoading} />
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

        .new-password-field{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            }
            .new-password-field input[name="password"]{
              width: 95%;
              border-radius: 6px 0 0 6px !important;
            }
            .new-password-field input[name="password_confirmation"]{
              width: 95%;
              border-radius: 6px 0 0 6px !important;
            }
            .new-password-field .password-toggle-icon{
            background: white;
            position: absolute;
            top: 0;
            right: 0;
            height: 58px;
            border-radius: 0 6px 6px 0;
            width: 6%;
            padding: 0px 5px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            svg{
            position: relative;
            top: 0px !important;
            cursor: pointer;
            }
            }
      `}</style>
    </>
  );
};

export default LoginForm;
