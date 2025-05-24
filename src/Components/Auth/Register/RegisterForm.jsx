import { Form, Formik } from 'formik';
import { Col, Input, Label } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { RegisterAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { YupObject, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema } from '@/Utils/Validation/ValidationSchemas';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useRef, useState, useEffect } from 'react';

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useCreate(RegisterAPI, false, `/account/dashboard`, 'Register Successfully');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle input type via DOM
  useEffect(() => {
    const input = document.querySelector('input[name="password"]');
    const ConfirmPassword = document.querySelector('input[name="password_confirmation"]');

    if (input) {
      input.type = showPassword ? 'text' : 'password';
    }
    if (ConfirmPassword) {
      ConfirmPassword.type = showConfirmPassword ? 'text' : 'password';
    }
  }, [showPassword, showConfirmPassword]);

  return (
    <>
      {/* liranova register form */}

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          country_code: '91',
          phone: '',
        }}
        validationSchema={YupObject({
          name: nameSchema,
          email: emailSchema,
          password: passwordSchema,
          password_confirmation: passwordConfirmationSchema,
          phone: nameSchema,
        })}
        onSubmit={mutate}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form className='row g-md-4 g-3'>
            <SimpleInputField
              nameList={[
                { name: 'name', placeholder: t('enter_full_name'), title: 'name', label: 'full_name' },
                { name: 'email', placeholder: t('enter_email_address'), title: 'email', label: 'email_address' },
              ]}
            />
            <Col xs='12'>
              <div className='country-input'>
                <SearchableSelectInput
                  nameList={[
                    {
                      name: 'country_code',
                      notitle: 'true',
                      inputprops: {
                        name: 'country_code',
                        id: 'country_code',
                        options: AllCountryCode,
                      },
                    },
                  ]}
                />
                <SimpleInputField
                  nameList={[
                    {
                      name: 'phone',
                      type: 'number',
                      placeholder: t('enter_phone_number'),
                      colclass: 'country-input-box',
                      title: 'phone',
                      label: 'phone',
                    },
                  ]}
                />
              </div>
            </Col>

            <Col xs='12'>
              <div className='new-password-field'>
                <SimpleInputField
                  nameList={[
                    {
                      name: 'password',
                      placeholder: t('password'),
                      type: 'password',
                      title: 'password',
                      label: 'password',
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

            <Col xs='12'>
              <div className='new-password-field'>
                <SimpleInputField
                  nameList={[
                    {
                      name: 'password_confirmation',
                      type: 'password',
                      placeholder: t('enter_confirm_password'),
                      title: 'confirm_password',
                      label: 'confirm_password',
                    },

                  ]}
                />
                <div
                  className="password-toggle-icon"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </Col>
            <SimpleInputField
              nameList={[

              ]}
            />

            {/* Eye Icon for Password */}

            {/* Eye Icon for Password */}


            <Col xs={12}>
              <div className='forgot-box'>
                <div className='form-check remember-box'>
                  <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                  <Label className='form-check-label' htmlFor='flexCheckDefault'>
                    {t('i_agree_with')}
                    <span>{t('terms')}</span> {t('and')} <span>{t('privacy')}</span>
                  </Label>
                </div>
              </div>
            </Col>
            <FormBtn title={'sign_up'} classes={{ btnClass: 'btn new-btn btn-animation w-100' }} loading={isLoading} />
          </Form>
        )}
      </Formik>

      {/* liranova css new btn */}
      <style>{`
      .new-btn{
      background: #118f79 !important;
      &::before{
      background: #0f7a6a !important;
      }
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

export default RegisterForm;

