'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import { Col, TabContent, TabPane } from 'reactstrap';
import AccountSidebar from '../Common/AccountSidebar';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import NotificationData from './NotificationData';

const AccountNotificationContent = () => {
  return (
    <>
      <Breadcrumb title={'notifications'} subNavigation={[{ name: 'notifications' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'notification'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <NotificationData />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountNotificationContent;
