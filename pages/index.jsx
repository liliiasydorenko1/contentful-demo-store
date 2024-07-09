import _ from "lodash";
import { getEntriesByContentType } from "../lib/helpers";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";
import BannerGrid from '../components/bannerGrid'
import Container from '../components/container'

const DEFAULT_LOCALE = "en-US";

export default function Home(props) {
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
                      bannersCollection={fields.banners}
                    />
                  );
            }
            return <></>;
          })
          : ""}
      </Container>
    </>
  );
}

export async function getStaticProps ({ preview = true }) {
  const pageEntries = await getEntriesByContentType("page", "home-page");
  let homepageEntry = _.get(pageEntries, "items[0]");

  return {
    props: {
      preview,
      page: homepageEntry ? homepageEntry : {},
    },
  };
}
