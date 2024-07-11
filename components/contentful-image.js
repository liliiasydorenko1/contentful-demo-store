import Image from 'next/image'
import {ContentfulLivePreview} from "@contentful/live-preview";

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = (props) => {
  return <Image
    loader={contentfulLoader} {...props} />
}

export default ContentfulImage
