import classNames from 'classnames';
import Banner from "./banner";
import TextBlock from "./text-block";

export default function BannerGrid({
  bannersCollection,
  isSmallBanners,
  isAlternativeMobileView,
  visibleOnMobile
}) {
  const gridNum = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4'
  }

  return (
    <div className={classNames("grid w-full gap-4 mb-4 sm:grid-cols-1", visibleOnMobile ? '' : 'hiddenOnMobile',
                               isAlternativeMobileView && bannersCollection.length === 3 ? 'banner-grid-alt-3'
                                 : isAlternativeMobileView  && bannersCollection.length === 2 ? 'banner-grid-alt-2' : '',
                               bannersCollection && gridNum[bannersCollection.length])}>
      {bannersCollection && bannersCollection.map((item) => {
        const contentType = item.sys.contentType.sys.id;

            if(contentType === 'banner' || contentType === 'bannerWithCloudinaryImage'){
              return  <Banner
                key={item.sys.id + contentType}
                sysId={item.sys.id}
                banner={item}
                type={contentType}
                isSmallBanners={isSmallBanners}
              />
            }

        if(contentType === 'textBlock') {
          return <TextBlock
            key={item.sys.id + contentType}
            title={item.fields.title}
            sysId={item.sys.id}
            text={item.fields.text.content}
            backgroundColor={item.fields.backgroundColor}
          />
        }
      })}
    </div>
  );
}
