import MenuSkeleton from "@/Components/Common/SkeletonLoader/MenuSkeleton";
import request from "@/Utils/AxiosUtils";
import { MenuAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import TodaysDeal from "./TodaysDeal";


const MainHeaderMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState([]);
  const { data: menuData, refetch: productRefetch, isLoading: menuIsLoading } = useQuery([MenuAPI], () => request({ url: MenuAPI }, router), { enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });
  useEffect(() => {
    productRefetch();
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 1200);

  // Update on screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 1200);
      if (window.innerWidth > 1200) {
        setActiveIndex(null); // Reset any opened dropdown on large screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (index) => {
    if (!isResponsive) return; // prevent toggling on large screens
    setActiveIndex(activeIndex === index ? null : index);
  };

  // const menuItems = [
  //   {
  //     title: "BRAS",
  //     icon: '/assets/images/bra.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "T-Shirt Bra",
  //       "Push-Up Bra",
  //       "Padded Bra",
  //       "Non-Padded Bra",
  //       "Underwired Bra",
  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "PANTIES",
  //     icon: '/assets/images/pantie.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "Briefs",
  //       "Hipsters",
  //       "Thongs",
  //       "Bikini Panty",
  //       "Boyshorts",
  //       "Seamless Panty",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",
  //           "Plus Size Panties",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "NIGHTWEAR",
  //     icon: '/assets/images/nightwear.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "Nighty",
  //       "Shorts Set",
  //       "Camisole Set",
  //       "Babydoll",
  //       "Night Suit",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "ACTIVE",
  //     icon: '/assets/images/active.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "Sports Bra",
  //       "Yoga Pants",
  //       "Track Pants",
  //       "Tights",
  //       "Tank Tops",
  //       "Running Shorts",
  //       "Activewear Jacket",
  //       "Gym Shorts",
  //       "Crop Top",
  //       "Active Sets"
  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",
  //           "Plus Size Panties",
  //           "Plus Size Pants",
  //           "Plus Size Underwear",
  //           "Plus Size Swimwear"
  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "SHAPEWEAR",
  //     icon: '/assets/images/shapewear.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "Tummy Tucker",
  //       "Thigh Shaper",
  //       "Shaping Panty",
  //       "Bodysuit",
  //       "Waist Cincher",
  //       "Control Shorts",
  //       "Saree Shapewear",
  //       "High Waist Brief",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "SWIM",
  //     icon: '/assets/images/swim.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "One-Piece",
  //       "Two-Piece",
  //       "Swim Dress",
  //       "Tankini",
  //       "Swim Shorts",
  //       "Bikini Top",
  //       "Bikini Bottom",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",
  //           "Plus Size Panties",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "MENS",
  //     icon: '/assets/images/men.png',
  //     tag: '',
  //     topic: 'Bra',
  //     subItems: [
  //       "Boxers",
  //       "Briefs",
  //       "Trunks",
  //       "Vests",
  //       "Thermals",
  //       "Lounge Pants",
  //       "Sleepwear",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",
  //           "Plus Size Panties",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "SKIVIA",
  //     icon: '/assets/images/skivia.png',
  //     tag: 'New',
  //     border: 'none',
  //     topic: 'Bra',
  //     subItems: [
  //       "Luxury Bras",
  //       "Everyday Bras",
  //       "Printed Panties",
  //       "Lace Lingerie",
  //       "Nightwear Sets",
  //       "Seamless Panties",

  //     ],
  //     sports: [
  //       {
  //         topic: "Sport Bra",
  //         items: [
  //           "Sports Bra",
  //           "Yoga Pants",
  //           "Track Pants",
  //           "Tights",
  //           "Pants",
  //           "Panties",
  //           "Nightwear",
  //           "Active",
  //           "Plus Size Active",
  //           "Plus Size Nightwear",
  //           "Plus Size Panties",

  //         ]
  //       }
  //     ],
  //     image: '/assets/images/cookie-bar.png',
  //   },
  //   {
  //     title: "4 BRAS @899",
  //   },
  //   {
  //     title: "4 PANTIES @599",
  //   },

  // ];


  return (
    <>
      {/* -------------------------bottom header menu----------------------------------------- */}



      {menuIsLoading ? (
        <MenuSkeleton />
      ) : (
        menuData?.length > 0 && (
          <ul className="navbar-nav">
            {menuData?.map((menu, i) => (
              <MenuList menu={menu} key={i} customClass={`${!menu?.path ? "dropdown" : ""} nav-item `} level={0} isOpen={isOpen} setIsOpen={setIsOpen} />
            ))}
          </ul>
        )
      )}

{/* <nav className="bottom-menu">
      <div className="menu-nav menu-responsive">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-nav-dropdowns"
            onClick={() => toggleDropdown(index)}
            onMouseLeave={() => !isResponsive && setActiveIndex(null)}
          >
            <span style={{ borderRight: item.border }}>
              <div className="menu-icon-name">
                <img src={item.icon} alt="Error" />
                {item.title}
                <div className="menu-tag">
                  <p>{item.tag}</p>
                </div>
              </div>
              <p className="span-arrow">^</p>
            </span>

            {(isResponsive ? activeIndex === index : true) && item.subItems && (
              <div className="menu-nav-dropdown">
                <div className="menu-dropdown">
                  <div className="menu-nav">
                    <h4 className="menu-nav-topic">{item.topic}</h4>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem}</li>
                    ))}
                  </div>
                  <ul className="menu-nav">
                    {item.sports?.map((sport, subIndex) => (
                      <div key={subIndex} className="menu-nav">
                        <h4 className="menu-nav-topic">{sport.topic}</h4>
                        {sport.items.map((name, i) => (
                          <li key={i}>{name}</li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
                <img src={item.image} alt="Error" />
              </div>
            )}
          </div>
        ))}
      </div>
    </nav> */}


      {/* liranova css bottom header */}

      {/* <style>{`
      .bottom-menu {
    height: 49px;
    position: relative;
    bottom: 13px;
}
      .header-nav{
      background: #118f79;
      }
     
.menu-nav {
width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 20px;
  list-style: none;
  margin: 0;
  position: relative;

 h4{
 font-size: 14px;
 color: #1a4b99;
 font-weight: 600;
 padding-bottom: 10px;
 }
  }

  .menu-nav li::before{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #118f79;
  transition: .3s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .menu-nav li:hover::before{
  width: 50px;
  
  }
  .menu-icon-name{
  gap: 10px;
  display: flex;
  align-items: center;
  position: relative;
  color: menu-icon-name;
  }
.menu-icon-name img{
width: 20px;
object-fit: cover;
}
.menu-icon-name .menu-tag {
    position: absolute;
    min-width: 50px;
    top: -20px;
    right: -20px;
    background: #1a4b99;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 0px 5px;
    border-radius: 20px;

    
  p{
  margin-bottom: 0;
  text-align:center;
  }
  }

.menu-nav span {
  cursor: pointer;
  color: white;
  position: relative;
  padding: 0px 20px;
  transition: 0.3s ease-in;
  font-weight: 600;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-nav span:not(:last-child)::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0px;
  height: 50%;
  border-right: 2px solid #a5a5a5;
  margin-bottom: 12px;
  transition: .3s ease-in;
}
  .menu-nav span:last-child::before {
  border-right: none;
}


.span-arrow{
display: none;
}

.menu-nav span:hover {
  background: #1a4b99;
  color: white;
}
.menu-nav span:hover::before {
content: "";

border-right: none;
}
.menu-icon-name img{
display: none;
}

.menu-nav-dropdowns {
  position: relative;
  min-height: 10px;
}

.menu-dropdown{
display: flex;
flex-direction: row !important;
align-items: start;
justify-content: center;
gap: 80px;
}

.menu-nav-dropdown {
    display: flex;
    position: fixed;
    top: 50px;
    left: 0vw;
    right: 0px;
    width: 90vw;
    min-height: 250px;
    background: white;
    padding: 30px 50px;
    z-index: 9999;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 20px;
    transition: .4s ease-in-out;
    scale: 0;
    border-radius: 10px;

  .menu-nav{
  gap: 10px;
  flex-direction: column;
  padding: 0 5px;
  } 
  
  li{
  font-size: 13px;
  font-weight: 400;
  color: #434343;
  cursor: pointer;
  transition: .3s ease-in;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: start;
  text-wrap: nowrap;

  &:hover{
  transform: translateX(5px);
  }
  }
}

.menu-nav-dropdown img{
flex: 1;
max-width: 200px;
object-fit: cover;
}
.menu-nav-dropdowns:hover{
height: auto;
}
.menu-nav-dropdowns:hover .menu-nav-dropdown {
  display: flex;
  height: auto;
  scale: 1; 
  top: 50px;
  box-shadow:0 0 8px #1a4b99;
}

.dropdown-items {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.dropdown-items li {
  color: #fff;
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 5px;
  transition: 0.3s;
}

.dropdown-items li:hover {
}

@media (max-width: 768px) {
  .menu-nav {
    flex-direction: column;
  }

  .menu-nav-dropdown {
    flex-direction: column;
    padding: 20px;
    top: 80px;
  }

  .dropdown-items {
    flex-direction: column;
    gap: 10px;
  }
}
  .dropdown-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.dropdown-column {
  flex: 1 1 20%; 
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-column li {
  padding: 6px 0;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
}

.dropdown-column li:hover {
  color: #ddd;
}




@media(max-width: 1200px){

     .bottom-menu{
     height: auto !important;
     }
         .menu-nav {
        display: flex;
        justify-content: start;
        align-items: start;
        flex-direction: column;
        padding: 0;
    }
        .menu-nav span{
        width: 100%;
        text-align: start;
        border-bottom: .5px solid #d7d7d7;
        color: #414141;
        height: 35px;
        font-size: 12px;
        font-weight: 400;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        }
        .menu-nav span:hover{
        background: transparent !important;
        color: #1a4b99 !important;
        }
        .menu-nav span::before{
        content: '';
        border-right: none !important;

        }
        
.menu-nav-dropdowns {
 width: 100%;
  min-height: 10px;

  img{
  display: none !important;
  }
}
.menu-nav-dropdown {
 width: 100%;
 display: none;
 border-radius: 0 !important;
 position: unset !important;
 min-height: 10px;
 box-shadow: none !important;
}
.menu-nav-dropdown:hover .menu-nav span{
    background: #1a4b99 !important;
  }
  .menu-dropdown{
  gap: 15px;
  flex-direction: column !important;
  }
  .menu-icon-name{
  width: -webkit-fill-available !important;
  }
  .menu-icon-name img{
  margin-bottom: 0;
  display: flex !important;
  }
  .menu-icon-name .menu-tag{
  display: none !important;
  }
  .menu-responsive span .span-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  transition: .3s ease-in;
  rotate: 180deg;
  font-size: 18px;
  }
  
  .menu-responsive span:hover .span-arrow{
    color: rgb(255 78 160);
    rotate: 0deg;
  }
 }




      `}</style> */}
    </>
  );
};

export default MainHeaderMenu;
