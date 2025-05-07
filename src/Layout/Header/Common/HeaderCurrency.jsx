import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import SettingContext from '@/Helper/SettingContext';
import CurrencyContext from '@/Helper/CurrencyContext';

const HeaderCurrency = () => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const { settingData, selectedCurrency, setSelectedCurrency } = useContext(SettingContext);
  // const { currencyState } = useContext(CurrencyContext);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  // useEffect(() => {
  //   let getDefaultCurrency = JSON.parse(localStorage.getItem('selectedCurrency'));
  //   setSelectedCurrency(getDefaultCurrency);
  // }, []);

  // const handleClick = (value) => {
  //   setSelectedCurrency(value);
  //   localStorage.setItem('selectedCurrency', JSON.stringify(value));
  // };

  // if (!currencyState?.length) return null;
  return (
// top header track order button

    <h6 className="topnav-rightBtn">Track Order</h6>
  );
};

export default HeaderCurrency;
