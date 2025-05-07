import React, { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { ModifyString } from '@/Utils/CustomFunctions/ModifyString';
import SettingContext from '@/Helper/SettingContext';
import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn';
import ProductBagde from '../Widgets/ProductBagde';
import ProductCartButton from '../Widgets/ProductCartButton';
import ProductRating from '../Widgets/ProductRating';
import ProductAction from "../Widgets/ProductAction/ProductAction"
import WishlistContext from '@/Helper/WishlistContext';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import HeaderWishList from '@/Layout/Header/RightSideHeader/HeaderWishList';

const BasicProductBox = ({ product, isClose, classObj = {}, isProductAction = true }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    const { removeWishlist } = useContext(WishlistContext);

    const offer = [
        { off: '50% Off' },
    ];

    // product image
    const Productimg = [
        {
            id: 1,
            img: '/assets/images/product-img/4.jpg',
        },
    ]


    return (

        // product section
        <div className={`product-box new-product-tag ${classObj?.productBoxClass}`}>
            <div className="new-product-tagline">{offer.map((item, i) => (
                <span key={i}>{item.off}</span>
            ))}</div>
            <ProductBagde productDetail={product} />
            <div className='product-image'>
                <Link href={`/product/${product?.slug}`}>
                    {Productimg.map((item, i) => (
                        <Image
                            key={i}
                            className="img-fluid product-image-cover"
                            priority={true}
                            //product image changes
                            // src={item.img}
                            src={product?.product_thumbnail ? product?.product_thumbnail?.original_url : placeHolderImage}
                            alt="product"
                            layout="intrinsic"
                            width={500}
                            height={500}
                        />
                    ))}
                </Link>
                {isProductAction && <ProductAction productObj={product} listClass="product-option" />}
                {isClose && (
                    <div className='product-header-top' onClick={() => removeWishlist(product.product_id, product.id)}>
                        <Btn className='wishlist-button close_button'>
                            <RiCloseLine />
                        </Btn>
                    </div>
                )}
            </div>
            <div className='product-detail'>
                {/* {product?.brand &&
                    <h6 className="brand-name">{product?.brand?.name}</h6>
                } */}
                <Link href={`/product/${product?.slug}`}>
                    <h6 className='name'>{product?.name}</h6>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                {product?.unit && <h6 className='unit mb-1'>{product?.unit}</h6>}
                {product?.store &&
                    <h6 className="byers">{('By')}<span className="text-title">{product?.store?.store_name}</span></h6>
                }
                <h5 className='sold text-content'>
                    <span className='theme-color price'>{convertCurrency(product?.sale_price)}</span>
                    {product?.discount && <del className='ms-1'>{convertCurrency(product?.price)}</del>}
                </h5>

                {/* <div className='product-rating mt-sm-2 mt-1'>
                    <ProductRating totalRating={product?.rating_count || 0} />
                    {product?.stock_status == 'in_stock' &&
                        <h6 className='theme-color'>{ModifyString(product?.stock_status, false, '_')}</h6>
                    }
                </div> */}
                <div className='add-to-cart-box product-cta-btn'>
                    <ProductCartButton productObj={product} text="Add" />
                </div>
            </div>
            {/* liranova css product card image */}
            <style>{`
             .product-section .product-box .product-image {
    text-align: center;
    padding: 0px !important;
    position: relative;
}

            .new-product-tag{
            position: relative;
            }
            .new-product-tag .new-product-tagline{
            position: absolute;
            top: 15px;
            z-index: 1;
            background: #1a4b99;
            padding: 3px 15px;
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
            }
            
            .product-image-cover{
            height: 400px !important;
            width: 100% !important;
            object-fit: cover !important;
            }
            .product-cta-btn{
            margin-top: 10px !important;
            background: transparent !important;
            border-radius: 0px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .btn-add-cart{
            width: 100%;
            margin-top: 0px !important;
            border: .5px solid #1a4b99;
            padding: 5px 0px !important;
            transition: all 0.3s ease;

            &:hover{
            color: #fff !important;
            background: #1a4b99 !important;
            }
            }
            @media (max-width: 575px) {
                .product-cta-btn .btn-add-cart{
                    width: 100%;
                }
                    .product-image-cover{
                    height: 150px !important;
                    }
                    }
                    }
                    @media (max-width: 768px) {
                        .product-image-cover{
                            height: 150px !important;
                        }
                    }
                    
            `}</style>
        </div>
    );
};

export default BasicProductBox;
