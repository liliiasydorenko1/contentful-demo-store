import Link from 'next/link'
import classNames from 'classnames';
import ContentfulImage from './contentful-image'
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";

export default function ProductsGrid({
  productsGrid,
  sysId
}) {

  return (
    <div className={classNames("grid w-full grid-cols-2 mb-4 md:grid-cols-6")}
      {...ContentfulLivePreview.getProps({
                                           entryId: sysId,
                                           fieldId: "productsGrid",
                                           locale: DEFAULT_LOCALE,
                                         })}>
      {productsGrid.map((item, index) => {
        return <div key={sysId + index} className="product-card">
          <div className="pb-1/1">
            <ContentfulImage
              width={2600}
              height={1000}
              alt="111"
              className="absolute l-0 t-0 p-6"
              src={item.image}
            />
          </div>
          <a href="#" className="product-card__name text-sm font-semibold">{item.name}</a>
          <div className="product-card__price text-l font-bold">{item.price}</div>
        </div>

      })}
    </div>
  );
}
