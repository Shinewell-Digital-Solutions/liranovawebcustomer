import React, { useContext, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { filterSort } from '../../../../Data/CustomData';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from 'next/navigation';

const FilterSort = ({ filter, setFilter }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [attribute, price, category, layout] = useCustomSearchParams(['attribute', 'price', 'category', 'layout']);
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const pathname = usePathname();
  const handleSort = (data) => {
    setFilter((prev) => {
      return {
        ...prev,
        sortBy: data.value,
        field: data && (data.value == 'asc' || data.value == 'desc') ? 'created_at' : null,
      };
    });

    let queryParams = new URLSearchParams({ ...attribute, ...price, ...category, ...layout, sortBy: data.value }).toString();
    if (data && (data.value == 'asc' || data.value == 'desc')) {
      const fieldQuery = new URLSearchParams();
      fieldQuery.append('field', 'created_at');
      queryParams += '&' + fieldQuery.toString();
    }
    router.push(`${pathname}?${queryParams}`);
  };
  return (
    // fiter sort
    <div className='category-dropdown'>
      <h5 className='text-content'>{t('sort_by')} :</h5>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <span>{filterSort.find((elem) => elem.value == filter?.sortBy)?.label || t('sort')}</span>
        </DropdownToggle>
        <DropdownMenu>
          <div className="dropdown-box">
            {filterSort.map((elem, i) => (
              <DropdownItem key={i} onClick={() => handleSort(elem)}>
                {elem.label}
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>

      {/* liranova css filter sort category */}

      <style>{`
      .category-dropdown {
    display: flex;
    align-items: center;
    min-width: 330px !important;
}
    @media(max-width: 425px){
    .category-dropdown {
      min-width: 250px !important;
    }
    }
      `}</style>
    </div>
  );
};

export default FilterSort;
