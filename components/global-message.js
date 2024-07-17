import classNames from 'classnames';
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";

export default function GlobalMessage({
  message,
  backgroundColor,
  sysId,
  link
}) {
  return (
      <div key={sysId}
        {...ContentfulLivePreview.getProps({
                                             entryId: sysId,
                                             fieldId: "globalMessage",
                                             locale: DEFAULT_LOCALE,
                                           })}
        className={classNames("absolute top-0 left-0 w-full flex items-center justify-center p-1 text-white mb-4 text-sm font-semibold")}
           style={{backgroundColor: backgroundColor}}>
        <a  className={classNames(link ? "underline" : '')} href={link}>{message}</a>
      </div>

  );
}
