import { usePathname, useRouter } from 'next/navigation';
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useTranslation } from "react-i18next";

// Sample data – replace this with your actual sort options
const sortByOptions = [
  { id: 1, value: 'priceLowHigh', label: 'Price: Low to High' },
  { id: 2, value: 'priceHighLow', label: 'Price: High to Low' },
  { id: 3, value: 'newest', label: 'Newest Arrivals' },
  { id: 4, value: 'popularity', label: 'Popularity' },
];

const CollectionSortBy = ({ filter, setFilter, attributeAPIData }) => {
  const router = useRouter();
  const [category, attribute, price, field, rating, layout, page] = useCustomSearchParams([
    'category',
    'attribute',
    'price',
    'field',
    'rating',
    'layout',
    'page'
  ]);

  const { t } = useTranslation('common');
  const pathname = usePathname();

  const checkSortBy = (value) => {
    return filter?.sortBy?.includes(value);
  };

  const applySortBy = (event) => {
    const value = event?.target?.value;
    let temp = [...(filter?.sortBy || [])];

    if (event.target.checked) {
      temp.push(value);
    } else {
      temp = temp.filter((item) => item !== value);
    }

    setFilter((prev) => ({
      ...prev,
      sortBy: temp,
    }));

    const updatedParams = {
      ...category,
      ...attribute,
      ...price,
      ...field,
      ...rating,
      ...layout,
      ...page,
      ...(temp.length > 0 ? { sortBy: temp } : {}),
    };

    const queryParams = new URLSearchParams(updatedParams).toString();
    router.push(`${pathname}?${queryParams}`);
  };

  return (
    <AccordionItem>
      <AccordionHeader targetId={(attributeAPIData?.length + 3).toString()}>
        <span>{t('sort_by')}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 3).toString()}>
        <ul className='category-list custom-padding custom-height'>
          {sortByOptions.map((option, i) => (
            <li key={i}>
              <div className='form-check category-list-box'>
                <Input
                  className='checkbox_animated'
                  type='checkbox'
                  id={`sortby-${option.id}`}
                  value={option.value}
                  checked={checkSortBy(option.value)}
                  onChange={applySortBy}
                />
                <Label className='form-check-label' htmlFor={`sortby-${option.id}`}>
                  <span className='name'>{option.label}</span>
                </Label>
              </div>
            </li>
          ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionSortBy;
