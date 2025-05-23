import { useContext, useState } from 'react';
import Link from 'next/link';
import { RiEyeLine } from 'react-icons/ri';
import { Table } from 'reactstrap';
import NoDataFound from '@/Components/Common/NoDataFound';
import Pagination from '@/Components/Common/Pagination';
import SettingContext from '@/Helper/SettingContext';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { OrderAPI } from '@/Utils/AxiosUtils/API';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import { useQuery } from '@tanstack/react-query';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import { useTranslation } from "react-i18next";
import AccountHeading from '@/Components/Common/AccountHeading';
import { useRouter } from 'next/navigation';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const router = useRouter()
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { data, isLoading, refetch } = useQuery([page], () => request({ url: OrderAPI, params: { page: page, paginate: 10 } },router), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (res) => res?.data,
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="my_orders" />
      {data?.data?.length > 0 ? (
        <>
          <div className='total-box mt-0'>
            <div className='wallet-table mt-0'>
              <Table>
                <tbody>
                  <tr>
                    <th>{t('no')}</th>
                    <th>{t('order_number')}</th>
                    <th>{t('date')}</th>
                    <th>{t('amount')}</th>
                    <th>{t('payment_status')}</th>
                    <th>{t('payment_method')}</th>
                    <th>{t('option')}</th>
                  </tr>
                  {data?.data?.map((order, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className='fw-bolder'>#{order.order_number}</span>
                      </td>
                      <td>{dateFormate(order?.created_at)}</td>
                      <td>{convertCurrency(order?.total)} </td>
                      <td>
                        <div className={`status-${order.payment_status.toLowerCase()}`}>
                          <span>{order.payment_status}</span>
                        </div>
                      </td>
                      <td>{order.payment_method.toUpperCase()}</td>
                      <td>
                        <Link href={`/account/order/details/${order.order_number}`}>
                          <RiEyeLine />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <nav className='custome-pagination'>
            <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'no_orders_found',
            description: 'no_orders_have_yet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default MyOrders;
