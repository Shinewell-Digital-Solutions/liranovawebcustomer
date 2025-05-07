import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import TopbarLeft from "./TopbarLeft";
import TopbarSlider from "./TopbarSlider";
import TopLanguage from "./TopLanguage";
import HeaderCurrency from "./HeaderCurrency";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { usePathname, useSearchParams } from "next/navigation";
import ZoneBar from "./ZoneBar";
import SettingContext from "@/Helper/SettingContext";
import { RiFocus3Line } from "react-icons/ri";
import ZoneContext from "@/Helper/ZoneContext";

const HeaderTopBar = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);

  const addClass = useRef(null);
  const pathName = useSearchParams();
  const theme = pathName.get("theme");
  useEffect(() => {
    if (theme == `tokyo`) {
      addClass.current?.classList.add("bg-dark");
    }

    return () => {
      addClass.current?.classList.remove("bg-dark");
    };
  }, [theme]);
  return (
    // header top bar
    <div
      className={`header-top top-header-new ${themeOption?.header?.page_top_bar_dark ? " bg-dark" : ""
        }`}
      ref={addClass}
    >
      <div className="container-fluid-lg top-headers">
        <Row className="top-nav-header">
          <TopbarLeft themeOption={themeOption} />
          <TopbarSlider />
          <Col lg={3} >
            <ul className="about-list right-nav-about">
              {settingData?.activation?.zone_enable && (
                  <ZoneBar/>
              )}
              <li className="right-nav-list">
                <TopLanguage />
              </li>
              <li className="right-nav-list">
                <HeaderCurrency />
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      {/* liranova css top header */}
      <style>
        {`
        .header-top{
          background: transparent !important;
        }
        .top-nav-header{
        border-bottom: .5px solid #d7d1d1;
        }
        `}
      </style>
      
    </div>
  );
};
export default HeaderTopBar;
