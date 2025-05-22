'use client';
import i18next from "i18next";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import English from '../../../../public/assets/images/country/English.png';
import French from '../../../../public/assets/images/country/French.png';
import Spanish from '../../../../public/assets/images/country/Spanish.png';
import Arabic from '../../../../public/assets/images/country/arabic.png';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { AllLanguageApi } from "@/Utils/AxiosUtils/API";
import LanguageContext from "@/Helper/LanguageContext";
import Cookies from "js-cookie";

const TopLanguage = () => {  
  // const { i18n } = useTranslation('common');
  // const currentLanguage = i18n.resolvedLanguage;
  // const { setLocalLanguage } = useContext(LanguageContext);
  // const  router = useRouter()

  // const [selectedLang, setSelectedLang] = useState({ lang: currentLanguage,});
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  // const { data: languages } = useQuery(["languages"], () => request({ url: AllLanguageApi }), {enabled: true, refetchOnWindowFocus: false, refetchOnMount: false, select: (res) => res.data.data });

  // useEffect(() => {
  //   const defaultLanguage = languages?.find((lang) => lang.locale === currentLanguage);
  //   if (defaultLanguage) {
  //     setSelectedLang(defaultLanguage);
  //   }
  // }, [languages, currentLanguage]);

  // const handleChangeLang = (lang) => {
  //   setSelectedLang(lang);
  //   setLocalLanguage(lang.locale);
  //   i18n.changeLanguage(lang.locale);
  //   Cookies.set('i18next', lang.locale);
  //   router.refresh();
  // };

  return (
    <>
    {/* top header contact us button */}
    <h6 className="topnav-rightBtn">Contact Us</h6>

    {/* liranova css header contact btn */}
    <style>{`
    .topnav-rightBtn{
    transition: .3s ease-in-out;
    cursor: pointer;
    font-weight: bold;
    color: white;
    }
    `}</style>

    </>
    
  );
};

export default TopLanguage;
