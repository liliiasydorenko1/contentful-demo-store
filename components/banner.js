import classNames from 'classnames';
import Link from 'next/link'
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";
import { useEffect, useState } from "react";
import ContentfulImage from "./contentful-image";

export default function Banner({
  isSmallBanners,
  banner,
  sysId
}) {
  useEffect(() => {
  })
    return (
      <div
        {...ContentfulLivePreview.getProps({
                                             entryId: sysId,
                                             fieldId: "image",
                                             locale: DEFAULT_LOCALE,
                                           })}

        className={classNames("bannerGridCol relative w-full h-0", isSmallBanners ? 'pb-1/5' : 'pb-1/1')}>
        {banner.fields.image &&
         <div
           key={banner.sys.id + 'desk'}
           className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-black", banner.fields.mobileImage && 'hiddenOnMobile')}
           style={{
             backgroundImage: banner.fields.image.fields.file ? `url(${banner.fields.image.fields.file.url})` : ""
           }}>
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
        {banner.fields.mobileImage &&
        <div
          key={banner.sys.id + 'mob'}
          className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-black hiddenOnDesktop")}
          style={{
            backgroundImage: banner.fields.mobileImage.fields.file ? `url(${banner.fields.mobileImage.fields.file.url})` : ""
          }}>
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
