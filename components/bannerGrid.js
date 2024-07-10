import Link from 'next/link'
import classNames from 'classnames';

export default function BannerGrid({
  bannerGrid,
  bannersCollection
}) {
  const gridNum = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4'
  }
  const imageRatio = {
    '1': 'pb-1/5',
    '2': 'pb-2/3',
    '3': 'pb-4/5',
    '4': 'pb-1/1'
  }
  return (
    <div className={classNames("grid w-full", gridNum[bannerGrid])} >
      {bannersCollection && bannersCollection.map((banner) => {
        return (
          <div key={banner.sys.id} className={classNames("relative w-full h-0", imageRatio[bannerGrid])}>
            <div
              className={classNames("absolute inset-0 flex flex-col justify-between p-4 bg-center bg-no-repeat bg-cover w-full h-full text-white")} style={{backgroundImage: `url(${banner.fields.image.fields.file.url})`}}>
              <h3 className="uppercase">{banner.fields.subtitle}</h3>
              <div className="max-w-[800px]">
                <h1 className="text-2xl font-bold">{banner.fields.title}</h1>
                <p className="min-h-[48px] hidden lg:block">{banner.fields.description}</p>
                {banner.fields.button_link && <Link href={`${banner.fields.button_link}`}
                      target={banner.fields.openInNewWindow ? '_blank' : '_parent'}
                      className="link">{banner.fields.button_text}</Link>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
