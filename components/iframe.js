import classNames from 'classnames';
import {ContentfulLivePreview} from "@contentful/live-preview";
const DEFAULT_LOCALE = "en-US";
import parse from 'html-react-parser';

export default function Iframe({
  input,
  sysId
}) {

  return (

    <div  {...ContentfulLivePreview.getProps({
                                               entryId: sysId,
                                               fieldId: "iframe",
                                               locale: DEFAULT_LOCALE,
                                             })}>
      {input &&
        parse(input)
      }

    </div>
  );
}
