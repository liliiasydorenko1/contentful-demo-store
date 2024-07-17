import Head from "next/head";
import _ from "lodash";

const MainLayout = (props) => {
  const data  = props.children.props;
  const page = _.get(data, "page");
  const sections = _.get(page, "fields.content"); // this field is an array of page sections
  const seoData =  typeof sections !== 'undefined' ? sections.filter(data => data.sys.contentType.sys.id === 'seoMetadata')[0].fields : '';

  console.log(seoData)
  return (
    <div>
      <Head>
        <title>{seoData.metaTitle || ''}</title>
        <meta name="title" content={seoData.metaTitle || ''}/>
        <meta name="description" content={seoData.metaDescription || ''}/>
        <meta name="keywords" content={seoData.metaKeywords || ''} />
      </Head>
      <main>
        <div className="h-screenx py-20 xl:px-40 lg:px-0"> {props.children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
