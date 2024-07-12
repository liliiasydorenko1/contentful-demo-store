import Link from 'next/link'
import classNames from 'classnames';
import ContentfulImage from './contentful-image'
import {ContentfulLivePreview} from "@contentful/live-preview";
import Banner from "./banner";
import TextBlock from "./text-block";
const DEFAULT_LOCALE = "en-US";

export default function ProductsGrid({
  productsGrid,
  sysId
}) {

  return (
    <div className={classNames("grid w-full sm:grid-cols-1 mb-4 md:grid-cols-6")}>
      {productsGrid.map((item, index) => {
        return <div className="product-card">
          <div className="pb-1/1">
            <ContentfulImage
              width={2600}
              height={1000}
              className="absolute l-0 t-0 p-6"
              src={item.image}
            />
          </div>
          <div className="product-card__name text-sm font-semibold">{item.name}</div>
          <div className="product-card__price text-l font-bold">{item.price}</div>
        </div>

      })}
    </div>
  );
}
