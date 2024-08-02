import classNames from 'classnames';
import Link from 'next/link'
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";
import { useEffect, useState } from "react";
import ContentfulImage from "./contentful-image";

export default function Banner({
  isSmallBanners,
  banner,
  sysId,
  type
}) {
  useEffect(() => {
  })
  const image = type === 'banner' ? banner.fields.image : banner.fields.image;
  const mobileImage = type === 'banner' ? banner.fields.mobileImage : banner.fields.mobileImage;
  const imageFile = image && (type === 'banner' ? image.fields.file : image[0])
  const mobileImageFile = mobileImage && type === 'banner' ? mobileImage.fields.file : mobileImage && type !== 'banner' ? mobileImage[0] : 'undefined';
    return (
      <div
        {...ContentfulLivePreview.getProps({
                                             entryId: sysId,
                                             fieldId: "image",
                                             locale: DEFAULT_LOCALE,
                                           })}

        className={classNames("bannerGridCol relative w-full h-0", isSmallBanners ? 'pb-1/5' : 'pb-1/1')}>
        {image &&
         <div
           key={banner.sys.id + 'desk'}
           className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-black", banner.fields.mobileImage && 'hiddenOnMobile')}
           style={{
             backgroundImage: imageFile ? `url(${imageFile.url})` : ""
           }}>
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
        {mobileImage &&
        <div
          key={banner.sys.id + 'mob'}
          className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-black hiddenOnDesktop")}
          style={{
            backgroundImage: mobileImageFile ? `url(${mobileImageFile.url})` : ""
          }}>
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
