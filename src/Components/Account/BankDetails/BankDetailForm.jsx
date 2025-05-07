import { useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';

import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn';
import { PaymentAccountAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import useCreate from '@/Utils/Hooks/useCreate';
import AccountHeading from '@/Components/Common/AccountHeading';
import Loader from '@/Layout/Loader';
import { useRouter } from 'next/navigation';

const BankDetailForm = () => {
  const { t } = useTranslation( 'common');
  const router = useRouter()
  const {
    data,
    refetch,
    isLoading: paymentLoader,
  } = useQuery([PaymentAccountAPI], () => request({ url: PaymentAccountAPI },router), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, []);
  const { mutate, isLoading } = useCreate(PaymentAccountAPI, false, false, 'Account Details Updated Successfully.');
  if (paymentLoader) return <Loader />;
  return (
    <>
      <Formik
        initialValues={{
          bank_account_no: data ? data?.bank_account_no : '',
          bank_holder_name: data ? data?.bank_holder_name : '',
          bank_name: data ? data?.bank_name : '',
          paypal_email: data ? data?.paypal_email : '',
          swift: data ? data?.swift : '',
          ifsc: data ? data?.ifsc : '',
          paypal_email: data ? data?.paypal_email : '',
        }}
        onSubmit={(values) => {
          mutate(values);
        }}>
        <Form className='themeform-auth'>
          <AccountHeading title='bank_details' />
          <SimpleInputField
            nameList={[
              { name: 'bank_account_no', placeholder: t('enter_bank_account_no'), type: 'number', title: 'bank_account_no' },
              { name: 'bank_name', placeholder: t('enter_bank_name'), title: 'bank_name' },
              { name: 'bank_holder_name', placeholder: t('enter_bank_name'), title: 'holder_name' },
              { name: 'swift', placeholder: t('enter_swift'), title: 'swift' },
              { name: 'ifsc', placeholder: t('enter_ifsc'), title: 'ifsc' },
            ]}
          />
          <AccountHeading title='paypal_details' />
          <SimpleInputField nameList={[{ name: 'paypal_email', type: 'email', placeholder: t('enter_paypal_email'), title: 'paypal_email' }]} />
          <div className='text-end'>
            <Btn className='theme-bg-color btn-md d-inline-block' title='save' loading={Number(isLoading)}></Btn>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default BankDetailForm;
