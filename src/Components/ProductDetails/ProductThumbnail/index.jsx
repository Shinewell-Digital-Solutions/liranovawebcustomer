import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import ProductDetailAccordion from '../Common/ProductDetailAccordion';
import ThumbnailImage from './ThumbnailImage';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import ProductContent from '../Common/ProductContent';
import ProductStatus from '../Common/ProductStatus';
import PaymentOptions from '../Common/PaymentOptions';
import ProductInformation from '../Common/ProductInformation';
import ProductDeliveryInformation from '../Common/ProductDeliveryInformation';
import ProductSocial from '../Common/ProductSocial';
import ProductBundle from '../Common/ProductBundle';

const ProductThumbnail = ({ productState, setProductState, customTab }) => {
  return (
    <>

    {/* product details content  */}
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7} className='new-product-detail-section'>
          <Row className='g-4'>
            <Col xl={6} className='new-product-detail-section-img '>
              <ThumbnailImage productState={productState} setProductState={setProductState} />
            </Col>
            <Col xl={6} lg={5} className='new-product-detail-section-content'>
              <div className="right-box-contain">
                <CustomerOrderCount productState={productState} />
                <ProductContent productState={productState} setProductState={setProductState} />
                <ProductStatus productState={productState} />
                <ProductInformation productState={productState} />
                <ProductDeliveryInformation productState={productState} />
                <PaymentOptions productState={productState} />
                <ProductSocial productState={productState} />
                <ProductDetailsTab productState={productState} setProductState={setProductState} />
              </div>
            </Col>
            {productState?.product?.cross_sell_products?.length > 0 && (
              <Col xs={12} className='related-product-2'>
                <ProductBundle productState={productState} />
              </Col>
            )}
            {/* {customTab ? <ProductDetailAccordion productState={productState} /> : <ProductDetailsTab productState={productState} setProductState={setProductState} />} */}
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} setProductState={setProductState} />
      </WrapperComponent>


      {/* liranova css product content */}
      <style>{`
      .new-product-detail-section{
      width: 100% !important;
      }
      .new-product-detail-section-img{
      width: 100% !important;
      max-width: 500px !important;
      position: sticky !important;
      top: 450px !important;

      .product-left-box{
      position: sticky !important;
      top: 140px !important;
      }
      }
      .new-product-detail-section-content{
      width: 100% !important;
      max-width: 800px !important;
      }
      .product-section .right-box-contain .name {
      font-size: 20px !important;
      font-weight: 400 !important;
      color: #1a4b99 !important;
      }
      @media (max-width: 991px) {
        .new-product-detail-section-img{
          max-width: 100% !important;
        }
        .new-product-detail-section-content{
          max-width: 100% !important;
        }
      }
      `}</style>
    </>
  );
};

export default ProductThumbnail;
