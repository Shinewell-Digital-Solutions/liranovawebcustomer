'use client';

import WrapperComponent from '../Common/WrapperComponent';
import MapSection from './MapSection';
import ContactLeftSideBox from './ContactLeftSideBox';
import ContactRightSidebar from './ContactRightSidebar';
import Breadcrumb from '../Common/Breadcrumb';

const ContactUsContent = () => {
  return (
    <>
      <Breadcrumb title={'contact_us'} subNavigation={[{ name: 'contact_us' }]} />
      <WrapperComponent classes={{ sectionClass: 'contact-box-section', row: 'g-lg-5 g-3' }} customCol={true}>
        <ContactLeftSideBox />
        <ContactRightSidebar />
      </WrapperComponent>
      <MapSection />
    </>
  );
};

export default ContactUsContent;
