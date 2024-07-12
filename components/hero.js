import Link from 'next/link'
import classNames from 'classnames';
import ContentfulImage from './contentful-image'
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";

export default function Hero({
  title,
  image,
  contentPosition,
  heroLink,
  brandName,
  openInNewWindow,
  imageOverlay,
  sysId
}) {
  const textPosition = {
    'left': 'md:basis-2/4',
    'center': 'items-center w-full',
    'right': 'items-end md:basis-2/4'
  }

  return (
    <div
      {...ContentfulLivePreview.getProps({
                                           entryId: sysId,
                                           fieldId: "image",
                                           locale: DEFAULT_LOCALE,
                                         })}
      className={classNames("relative flex bg-center bg-no-repeat bg-cover md:h-[276px] text-white mb-4")}>
      {imageOverlay && (
          <div className="absolute inset-0 w-full h-full bg-white bg-opacity-50"/>
        )}
        {image.contentType == "video/mp4" ?
          <video src={image.url} className="object-cover object-center w-full h-[276px] xl:h-[276px]" autoPlay loop muted/>
        :

          <ContentfulImage
            width={2600}
            height={1000}
            alt={`Cover Image for ${title}`}
            className="shadow-small object-cover object-center h-[276px] xl:h-[276px]"
            src={'https:' + image}
            />

        }
        <Link href={`${heroLink}`} target={ openInNewWindow ? '_blank' : '_parent'}>

          <div className={classNames("absolute inset-0 p-2 md:p-4 flex flex-col justify-end", textPosition[contentPosition])}>
          {brandName && (
            <p
              {...ContentfulLivePreview.getProps({
               entryId: sysId,
               fieldId: "brandName",
               locale: DEFAULT_LOCALE,
             })}
              className="text-5xl font-bold">
            {brandName}
            </p>
          )}
          </div>
        </Link>
    </div>
  );
}
