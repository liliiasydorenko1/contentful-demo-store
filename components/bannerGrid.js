import classNames from 'classnames';
import Banner from "./banner";
import _ from "lodash";
import TextBlock from "./text-block";

export default function BannerGrid({
  bannerGrid,
  bannersCollection
}) {
  const gridNum = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4'
  }

  return (
    <div className={classNames("grid w-full sm:grid-cols-1 gap-4 mb-4", gridNum[bannerGrid])} >
      {bannersCollection && bannersCollection.map((item) => {
        const contentType = item.sys.contentType.sys.id;


            if(contentType === 'banner'){
              return  <Banner
                banner={item}
                bannerGrid={bannerGrid}
              />
            }

        if(contentType === 'textBlock') {
          return <TextBlock
            title={item.fields.title}
            text={item.fields.text.content}
            backgroundColor={item.fields.backgroundColor}
          />
        }


      })}
    </div>
  );
}
