import classNames from 'classnames';
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";

export default function TextBlock({
  title,
  text,
  backgroundColor,
  sysId
}) {

  return (
    <div className={classNames("bannerGridCol mb-6 h-full xl:p-0 p-4", backgroundColor && "p-4 xl:p-4")} style={backgroundColor && {backgroundColor: backgroundColor}}>
      <h3 {...ContentfulLivePreview.getProps({
         entryId: sysId,
         fieldId: "title",
         locale: DEFAULT_LOCALE,
       })}
      className="text-3xl font-semibold mb-4">{title}</h3>
      <div
      {...ContentfulLivePreview.getProps({
         entryId: sysId,
         fieldId: "text",
         locale: DEFAULT_LOCALE,
       })}>
        {text && text.map((paragraph, index) => {
          return <p
            key={sysId + index} className="text-sm mb-4">{paragraph.content[0].value}</p>
        })}
      </div>
    </div>
  );
}
