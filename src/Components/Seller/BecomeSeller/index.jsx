'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import SellerPoster from './SellerPoster';
import SellerService from './SellerService';
import SellerBusiness from './SellerBusiness';
import SellerSelling from './SellerSelling';

const BecomeSellerContent = () => {
  return (
    <>
      <Breadcrumb title={'become_vendor'} subNavigation={[{ name: 'become_vendor' }]} />
      <SellerPoster />
      <SellerService />
      <SellerBusiness />
      <SellerSelling />
    </>
  );
};

export default BecomeSellerContent;
