import FormBtn from '@/Components/Common/FormBtn';
import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import { Form, Formik } from 'formik';
import { useTranslation } from "react-i18next";
import { Col } from 'reactstrap';
import { AllCountryCode } from '../../../../Data/AllCountryCode';

const LoginForm = ({ mutate, isLoading }) => {
  const { t } = useTranslation('common');

  return (
    <>

      <Formik
        initialValues={{
          country_code: '91',
          phone: '',
        }}
        validationSchema={YupObject({
          phone: nameSchema
        })}
        onSubmit={mutate}>
        {({ errors, touched, setFieldValue }) => (
          <Form className='row g-4'>
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

            <FormBtn title={'log_in'} classes={{ btnClass: 'btn new-btn btn-animation w-100' }} loading={isLoading} />
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
      `}</style>
    </>
  );
};

export default LoginForm;
