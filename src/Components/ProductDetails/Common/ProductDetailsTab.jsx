import { useState } from 'react';
import { Col, Row, TabContent, TabPane } from 'reactstrap';
import NavTabTitles from '@/Components/Common/NavTabs';
import TextLimit from '@/Utils/CustomFunctions/TextLimit';
import CustomerReview from './CustomerReview';
import QnATab from './QnATab';
import NoDataFound from '@/Components/Common/NoDataFound';
import { RiArrowDownSLine } from 'react-icons/ri';

const ProductDetailsTab = ({ productState }) => {
  let [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const ProductDetailsTabTitle = [
    { id: 1, name: 'description' },
    { id: 2, name: 'review' },
    { id: 3, name: 'q_a' },
  ];

  const seeMore = () => {
    setShowMore(!showMore)
  }
  return (

    // product details tab section
    <Col xs={12}>
      <div className='product-section-box mt-0'>
        <NavTabTitles classes={{ navClass: 'nav-tabs custom-nav' }} titleList={ProductDetailsTabTitle} activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabContent className='custom-tab' activeTab={activeTab}>
          <TabPane className={activeTab == 1 ? 'show active' : ''}>
            <div className={`product-description more-less-box  ${showMore ? "more" : ""}`}>
              {showMore ? (
                <TextLimit value={productState?.product?.description} />
              ) : (
                <TextLimit value={(productState?.product?.description?.substring(0, 1600))} />
              )}
              <button className="btn more-lest-btn" onClick={() => seeMore()}>{showMore ? 'Show Less' : 'Show more'}<RiArrowDownSLine /></button>
            </div>

          </TabPane>

          <TabPane className={activeTab == 2 ? 'show active' : ''}>
            <div className='review-box'>
              <Row className='g-4'>
                {productState?.product?.can_review || productState?.product?.reviews_count ? (
                  <CustomerReview productState={productState} />
                ) : (
                  <Col xl={12}>
                    <NoDataFound
                      data={{
                        customClass: 'no-data-added',
                        title: 'NoReviewYet',
                        description: 'NoReviewYetDescription',
                      }}
                    />
                  </Col>
                )}
              </Row>
            </div>
          </TabPane>
          <TabPane className={activeTab == 3 ? 'show active' : ''}>
            <QnATab productState={productState} activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </div>

      {/* liranova css product details tab */}
      <style>{`
      table{
      width: 100% !important;
      }
      `}</style>
    </Col>
  );
};

export default ProductDetailsTab;
