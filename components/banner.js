import classNames from 'classnames';
import Link from 'next/link'
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";

export default function Banner({
  bannerGrid,
  banner,
  sysId
}) {
  const imageRatio = {
    '1': 'pb-1/5',
    '2': 'pb-2/3',
    '3': 'pb-4/5',
    '4': 'pb-1/1'
  }
  return (
      <div key={banner.sys.id} className={classNames("bannerGridCol relative w-full h-0", imageRatio[bannerGrid])}>
        {banner.fields.image &&

         <div
           {...ContentfulLivePreview.getProps({
                                                entryId: sysId,
                                                fieldId: "image",
                                                locale: DEFAULT_LOCALE,
                                              })}
           className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-black")}
           style={{backgroundImage: banner.fields.image.fields.file ? `url(${banner.fields.image.fields.file.url})` : ''}}>
           <h3 className="uppercase">{banner.fields.subtitle}</h3>
           <div className="max-w-[800px]">
             <h1 className="text-2xl font-bold">{banner.fields.title}</h1>
             {banner.fields.buttonLink &&
              <Link
                {...ContentfulLivePreview.getProps({
                                                     entryId: sysId,
                                                     fieldId: "buttonText",
                                                     locale: DEFAULT_LOCALE,
                                                   })}
                href={`${banner.fields.buttonLink}`}
                target={banner.fields.openInNewWindow ? '_blank' : '_parent'}
                className="btn-secondary">{banner.fields.buttonText}
              </Link>}
           </div>
         </div>
        }

      </div>
  )
}
