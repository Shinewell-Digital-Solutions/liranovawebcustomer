import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import HeaderCategory from './Common/HeaderCategory';
import HeaderLogo from './Common/HeaderLogo';
import HeaderSearchBar from './Common/HeaderSearchBar';
import HeaderTopBar from './Common/HeaderTopBar';
import RightSideHeader from './RightSideHeader';

const BasicHeader = ({ headerClass }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scroll event and add/remove sticky class
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 8) { // You can adjust the scroll threshold as needed
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Use useEffect to add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`pb-md-4 pb-0 top-header-new ${themeOption?.header?.sticky_header_enable && headerClass} ${isSticky ? 'sticky-header' : ''}`}
      >
        {themeOption?.header?.page_top_bar_enable && !isSticky && <HeaderTopBar />}
        <div className='top-nav top-header'>
          <div className='container-fluid-lg'>
            <Row>
              <Col xs='12'>
                <div className='navbar-top'>
                  <HeaderLogo />
                  <HeaderSearchBar style={"basic"} />
                  <RightSideHeader />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className='container-fluid-lg'>
          <Row>
            <HeaderCategory />
          </Row>
        </div>
      </header>

      {/* Styling for sticky header */}
      <style>
        {`
          .sticky-header {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            transition: all 0.3s ease;
          }

          .top-header-new {
            background: linear-gradient(180deg, #8ee6f3, #0d55c9);
            padding-bottom: 0 !important;
          }

          .top-nav {
            padding: 0 !important;
          }
        `}
      </style>
    </>
  );
};

export default BasicHeader;
