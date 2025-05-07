import Cookies from 'js-cookie';
import Link from "next/link";
import { RiHeartLine } from "react-icons/ri";

const HeaderWishList = ({ wishListIcon }) => {
  const cookieUAT = Cookies.get("uaf");

  return (

    // header wishlist icon
    <li className="right-side wishlist-icon">
      <Link
        href="/wishlist"
        className="btn p-0 position-relative header-wishlist"
        onClick={() => {
          if (!cookieUAT) {
            Cookies.set("CallBackUrl", "wishlist");
          }
        }}
      >
        {wishListIcon ? wishListIcon : <RiHeartLine />}
      </Link>


      {/* liranova css wishlsit icon */}
      <style>{`
      .wishlist-icon{
        padding-right: 0px !important;
        padding-left: 20px !important;

          svg {
        width: 35px;
        height: 35px;
        color: red !important;
        background: #fff;
        font-size: 30px !important;
        padding: 5px;
        border: 1px solid red;
        border-radius: 50%;
    }
      }
      `}</style>
    </li>
  );
};

export default HeaderWishList;
