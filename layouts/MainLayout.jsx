import Head from "next/head";

const MainLayout = (props) => {
  const data  = props.children.props;
  const sections = data.page.fields.content;
  const seoData = sections.filter(data => data.sys.contentType.sys.id === 'seoMetadata')[0].fields;

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
