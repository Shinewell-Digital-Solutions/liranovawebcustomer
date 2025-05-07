import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useEffect, useState } from "react";
import CollectionLeftSidebar from "../Collection/CollectionLeftSidebar";
import Breadcrumb from "../Common/Breadcrumb";
import CollectionNoSidebar from "../Collection/CollectionNoSidebar";
import { useQuery } from "@tanstack/react-query";
import { AuthorAPI, PublicationAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import { useRouter } from "next/navigation";
import WrapperComponent from "../Common/WrapperComponent";
import MainCollection from "../Collection/MainCollection";
import Image from "next/image";
import { RiFacebookFill, RiGlobalLine, RiInstagramFill, RiPinterestFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const PublicationMainPage = ({ slug }) => {
    const router = useRouter();
    const { t } = useTranslation( 'common');

    const [filter, setFilter] = useState({ sortBy: 'asc' });
    const [sortBy] = useCustomSearchParams(['sortBy']);
    const { data: publication, isLoading, refetch } = useQuery([PublicationAPI], () => request({ url: `${PublicationAPI}/slug/${slug}` }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });

    useEffect(() => {
        if (isLoading) {
            refetch();
        }
    }, [isLoading]);

    useEffect(() => {
        setFilter((prev) => {
            return {
                ...prev,
                sortBy: sortBy ? sortBy?.sortBy : 'asc',
                publication_id: publication?.id
            };
        });
    }, [sortBy, publication]);
    return (
        <>
            <Breadcrumb title={`Publication: ${slug}`} subNavigation={[{ name: slug }]} />
            <section className="author-section">
                <div className="container-fluid-lg">
                    <div className="author-main-box">
                        <div className="cover-image">
                            {publication?.publisher_cover_image.original_url ? 
                                <img src={publication?.publisher_cover_image.original_url} height={1493} width={310} alt='publisher__cover_image' /> : 
                                <img src={'/assets/images/author_placeholder.png'} alt='publisher_cover_image' className="img-fluid" /> 
                            }
                        </div>
                        <div className="author-box">
                            <Image className="author-image" src={publication?.publisher_logo.original_url} height={248} width={248} alt='publisher_logo' />
                            <div className="right-side-box">
                                <div>
                                    <div className="author-name">
                                        <h4>{publication?.publisher_name}</h4>
                                        <p>{publication?.description}</p>
                                    </div>

                                    <div className="author-bottom-box">
                                        <div>
                                            <h5>{t("publisher_details")}:</h5>

                                            <ul className="country-list">
                                                <li>
                                                    <span>{t("country")} : </span> {publication?.country.name}
                                                </li>
                                                <li>
                                                    <span>{t("state")} : </span> {publication?.state.name}
                                                </li>
                                                <li>
                                                    <span>{t("city")} : </span> {publication?.city}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="social-list-box">
                                    <h5>{t("social_links")}:</h5>
                                    <ul className="social-list">
                                        {
                                            publication?.facebook && 
                                            <li>
                                                <Link href={publication?.facebook} target="_blank" className="fb">
                                                    <RiFacebookFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            publication?.instagram && 
                                            <li>
                                                <Link href={publication?.instagram} target="_blank" className="insta">
                                                    <RiInstagramFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            publication?.twitter && 
                                            <li>
                                                <Link href={publication?.twitter} target="_blank" className="twitter">
                                                    <RiTwitterXFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            publication?.youtube && 
                                            <li>
                                                <Link href={publication?.youtube} target="_blank" className="youtube">
                                                    <RiYoutubeFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            publication?.pinterest && 
                                            <li>
                                                <Link href={publication?.pinterest} target="_blank" className="pinterest">
                                                    <RiPinterestFill />
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
                <MainCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} />
            </WrapperComponent>
        </>
    );
};

export default PublicationMainPage;