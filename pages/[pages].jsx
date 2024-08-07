import _ from "lodash";
import { getEntriesByContentType } from "../lib/helpers";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";
import BannerGrid from '../components/bannerGrid'
import Hero from '../components/hero'
import Container from '../components/container'
import GlobalMessage from "../components/global-message";
import TextBlock from "../components/text-block";
import ProductsGrid from "../components/products-grid";
import products from './ecommerce_api_response_new2.json';

const DEFAULT_LOCALE = "en-US";

export default function Index(props) {
  const page = _.get(props, "page");
  const updatedPage = useContentfulLiveUpdates(page, DEFAULT_LOCALE) || page;
  const sections = _.get(updatedPage, "fields.content"); // this field is an array of page sections
  const sectionId = _.get(updatedPage, "sys.id");

  const headline = _.get(updatedPage, "fields.heading");
  return (
    <>

      <h1
        {...ContentfulLivePreview.getProps({
                                             entryId: page.sys.id,
                                             fieldId: "heading",
                                             locale: DEFAULT_LOCALE,
                                           })}
        className="font-bold text-2xl mb-4 text-center"
        key={sectionId}>
        {headline}
      </h1>

      <Container key={page.sys.id + 'container'} className="flex flex-col space-y-4">
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {

            const contentType = _.get(section, "sys.contentType.sys.id");
            const fields = _.get(section, "fields");
            const headline = _.get(section, "fields.heading");

            if (contentType === "globalMessage" && fields.isMessageVisible) {
              return (
                <GlobalMessage
                  key={section.sys.id + contentType}
                  sysId={section.sys.id}
                  message={fields.message}
                  link={fields.link}
                  backgroundColor={fields.backgroundColor}
                />
              )
            }

            if (contentType === "title") {
              return <h1
                {...ContentfulLivePreview.getProps({
                                                     entryId: section.sys.id,
                                                     fieldId: "heading",
                                                     locale: DEFAULT_LOCALE,
                                                   })}
                className="font-bold text-2xl mb-4 text-center"
                key={sectionId + contentType}>
                {headline}
              </h1>
            }
            if (contentType === "bannerGrid") {
              return (
                <BannerGrid
                  key={section.sys.id + contentType}
                  bannerGrid={fields.bannerGrid}
                  sysId={section.sys.id}
                  bannersCollection={fields.banners}
                  isSmallBanners={fields.isSmallBanners}
                  isAlternativeMobileView={fields.isAlternativeMobileView}
                  visibleOnMobile={fields.visibleOnMobile}
                />
              );
            }
            else if (contentType === 'hero') {
              const hero = fields.content[0].fields;
              return (
                <Hero
                  key={fields.content[0].sys.id + contentType}
                  sysId={fields.content[0].sys.id}
                  title={hero.title}
                  subtitle={hero.subtitle}
                  image={hero.image.fields.file ? hero.image.fields.file.url : ''}
                  mobileImage={hero.mobileImage && hero.mobileImage.fields.file.url}
                  contentPosition={hero.contentPosition}
                  heroLink={hero.heroLink}
                  brandName={hero.brandName}
                  openInNewWindow={hero.openInNewWindow}
                  imageOverlay={hero.imageOverlay}
                />
              );
            }
            else if (contentType === 'textBlock') {
              return (
                <TextBlock
                  key={section.sys.id + contentType}
                  sysId={section.sys.id}
                  title={fields.title}
                  text={fields.text.content}
                  backgroundColor={fields.backgroundColor}
                />
              )
            }
            else if (contentType === 'productsGrid') {
              return (
                <ProductsGrid
                  key={section.sys.id + contentType}
                  sysId={section.sys.id}
                  productsSkus={fields.productsSku}
                  productsGrid={products.items}
                />
              )
            }
            return <></>;
          })
          : ""}
      </Container>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const { pages } = params;
  const page = await getEntriesByContentType('page', pages);

  let pageEntry = _.get(page, "items[0]");


  return {

    props: {
      page: pageEntry
    },
  };
}
export async function getStaticPaths() {
  const pages = await getEntriesByContentType('page');

  return {
    paths: pages?.items.map(page => `/${page.fields.url}`) ?? [],
    fallback: false
  }
}
