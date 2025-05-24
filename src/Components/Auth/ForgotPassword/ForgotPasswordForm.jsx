import { useContext } from 'react';
import { Form, Formik } from 'formik';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import useHandleForgotPassword, { ForgotPasswordSchema } from '@/Utils/Hooks/Auth/useForgotPassword';
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useHandleForgotPassword();
  return (
    <>
      {/* liranova forgot password page */}
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => mutate(values)}>
        {() => (
          <Form className='row g-4'>
            <SimpleInputField nameList={[{ name: 'email', placeholder: t('enter_email_address'), title: 'email', label: 'email_address' }]} />
            <FormBtn title={'forgot_password'} classes={{ btnClass: 'btn-animation new-btn w-100 justify-content-center' }} loading={isLoading} />
          </Form>
        )}
      </Formik>
      {/* liranova css login-btn */}
      <style>{`
      .new-btn{
      background: #118f79 !important;
      &::before{
      background: #0f7a6a !important;
      }
      }
      `}</style>
    </>
  );
};

export default ForgotPasswordForm;
