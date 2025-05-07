'use client';

import Image from 'next/image';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';

const NewFooter = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      .new-footer {
        background-color: #1a4b99;
        color: white;
        font-family: Arial, sans-serif;
        padding: 40px 20px 5px;
      }
      .new-topFooter {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 30px;
        flex-wrap: wrap;
        gap: 50px;
      }
      .new-column h3 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #ffffff;
      }
      .new-column ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
      }
        .new-column.new-social {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
      .new-column li {
        margin-bottom: 8px;
      }
      .new-column a {
        text-decoration: none;
        color: #efefef;
        transition: .3s ease-in;
        position: relative;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 8px;

      }
      .new-column a:hover {
        color: white;
        transition: width 0.3s ease-in-out;
      }
        .new-column a::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s ease-in-out;
        }
        .new-column a:hover::before {
        width: 50px;
        transition: width 0.3s ease-in-out;
        }
      .new-appLinks {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .new-magazine {
        margin-top: 20px;
        font-weight: bold;
        color: #f7a7d7;
        font-size: 22px;
      }
      .new-divider {
        border: none;
        border-top: 1px solid white;
        margin: 30px 0;
      }
      .new-bottomFooter {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
        @media(max-width: 950px){
        .new-topFooter {
        display: flex;
        justify-content: start;
        align-items: start;
        margin-bottom: 30px;
        flex-wrap: wrap;
        gap: 50px;
      }
        }
      @media (min-width: 768px) {
        .new-bottomFooter {
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
      .new-info h4,
      .new-support h4 {
        font-size: 16px;
        margin-bottom: 8px;
        text-transform: uppercase;
      }
      .new-support p,
      .new-info p {
        margin: 4px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      .new-feedback {
        display: inline-flex;
        align-items: center;
        color: #f7a7d7;
        text-decoration: underline;
        margin-top: 8px;
      }
      .new-feedback:hover {
        color: #ffc9ed;
      }
      .column-list div {
        display: flex;
        flex-direction: column;
      }

        .bottom-development{
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        }
        .bottom-development a{
        color: orange;
        font-weight: 600;
        position: relative;
        transition: width 0.3s ease-in-out;
        }
        .bottom-development a::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: orange;
        transition: width 0.3s ease-in-out;
        }
        .bottom-development a:hover::before {
        width: 100%;
        transition: width 0.3s ease-in-out;
        }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const shopCategories = [
        'Padded Bra',
        'Push Up Bra',
        'Sexy Bra',
        'Strapless Bra',
        'T-shirt Bra',
    ];

    const supportItems = [
        'Conditions',
        'Trade Enquiries',
        'Return & Exchange',
        'Track Order',
        'Discreet Packaging',
    ];

    // const paymentLogos = [
    //     'https://cdn-icons-png.flaticon.com/512/196/196561.png',
    //     'https://seeklogo.com/images/P/pci-dss-compliant-logo-8D99F4F0F1-seeklogo.com.png',
    //     'https://upload.wikimedia.org/wikipedia/commons/6/6f/Visa_Inc._logo.svg',
    //     'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg',
    //     'https://upload.wikimedia.org/wikipedia/commons/d/d0/RuPay.svg',
    //     'https://upload.wikimedia.org/wikipedia/commons/2/2e/BHIM_logo.svg',
    //     'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg'
    // ];

    const renderColumnList = (items, chunkSize = 5) => (
        <ul className="column-list">
            {Array.from({ length: Math.ceil(items.length / chunkSize) }).map((_, colIndex) => (
                <div key={colIndex}>
                    {items.slice(colIndex * chunkSize, (colIndex + 1) * chunkSize).map((item, i) => (
                        <li key={i}><a href="#">{item}</a></li>
                    ))}
                </div>
            ))}
        </ul>
    );

    return (

        // footer section
        <section className="new-footer">
            <div className="new-topFooter">
                <div className="new-column">
                    <h3>Trending Categories</h3>
                    {renderColumnList(shopCategories)}
                </div>
                {/* <div className="new-column">
                    <h3>Services</h3>
                    {renderColumnList(services)}
                </div> */}
                <div className="new-column">
                    <h3>Support</h3>
                    {renderColumnList(supportItems)}
                </div>
                {/* <div className="new-column">
                    <h3>Get the App</h3>
                    <div className="new-appLinks">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={128} height={40} />
                        <Image src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width={128} height={40} />
                    </div>
                </div> */}
                <div className="new-column">
                    <h3>Registered Office:</h3>
                    <p>PURPLE PANDA FASHIONS LIMITED</p>
                    <p>109-B, Plot No. 18, Rajendra Jaina Tower</p>
                    <p>Wazirpur Commercial Complex, WPIA, New Delhi-110052</p>
                    <p>CIN: U52100DL2012PLC237371</p>
                </div>
                <div className="new-column new-contact">
                    <h3>Contact</h3>
                    <p><a href=""><FaPhoneAlt /> 1234-567-8910</a> </p>
                    <p><a href=""><FaWhatsapp /> +91 9876543210</a></p>
                    <p><a href=""><FaEnvelope /> care@lumeva.com</a></p>
                    <a href="#" className="new-feedback">Submit Feedback <BsArrowRight /></a>
                </div>
                <div className="new-column new-social">
                    <h3>Social Media</h3>
                    <a href="https://www.instagram.com/lumeva/" target="_blank" rel="noreferrer"><FaInstagram /> Instagram</a>
                    <a href="https://www.facebook.com/lumeva/" target="_blank" rel="noreferrer"><FaFacebookF /> Facebook</a>
                    <a href="https://twitter.com/lumeva" target="_blank" rel="noreferrer"><FaTwitter /> Twitter</a>
                    <a href="https://www.linkedin.com/company/lumeva/" target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
                </div>
            </div>

            <hr className="new-divider" />

            <div className="new-bottomFooter">
                <p className="bottom-development">
                    &copy; 2025 Lumeva.com. All Rights Reserved. Design & Developed by <a href="https://shinewell.in/" target="_blank" rel="noreferrer">Shine Well</a>
                </p>


                {/* <div className="new-payments">
                    {paymentLogos.map((src, i) => (
                        <Image key={i} src={src} alt="payment" width={40} height={24} />
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default NewFooter;
