import SettingContext from "@/Helper/SettingContext";
import TextLimit from "@/Utils/CustomFunctions/TextLimit";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Label } from "reactstrap";
import ProductRating from "../ProductRating";
import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";

const RightVariationModal = ({ cloneVariation }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");
  return (
    <>
      <h4 className="title-name">{cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.name : cloneVariation?.product?.name}</h4>
      <h4 className="price">
        {cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.sale_price) : convertCurrency(cloneVariation?.product?.sale_price)}
        {cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.discount : cloneVariation?.product?.discount ? <del>{cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.price) : convertCurrency(cloneVariation?.product?.price)}</del> : null}
        {cloneVariation?.selectedVariation ? (
          cloneVariation?.selectedVariation?.discount
        ) : cloneVariation?.product?.discount ? (
          <Label className="modal-label mb-0">
            {cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.discount : cloneVariation?.product?.discount}% {t("off")}
          </Label>
        ) : null}
      </h4>
      <div className="product-rating">
        <ProductRating totalRating={cloneVariation?.product?.rating_count} />
        <div className="fs-14 ms-2">
          {cloneVariation?.product?.reviews_count} {t("reviews")}
        </div>
      </div>
      <div className="product-detail">
        <h4>{t("product_details")}:</h4>
        <div className="mt-2">
          <TextLimit value={cloneVariation?.product?.short_description} maxLength={200} tag={"p"} />
        </div>
      </div>
      <div className="pickup-box">
        <div className="product-info">
          <ul className="product-info-list">
            <li>
              {t("sku")} : {cloneVariation?.selectedVariation?.sku ?? cloneVariation?.product?.sku}
            </li>
            <li>
              {t("stock_status")} :{cloneVariation?.selectedVariation?.stock_status ? ModifyString(cloneVariation?.selectedVariation?.stock_status, false, "_") : ModifyString(cloneVariation?.product?.stock_status, false, "_")}
            </li>
            <li>
              {t("quantity")} : {cloneVariation?.selectedVariation?.quantity ?? cloneVariation?.product?.quantity} {t("items_left")}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RightVariationModal;
