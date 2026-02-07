import {sanityClient} from './client'

export type GalleryImage = {
  _key: string
  title?: string
  caption?: string
  altText: string
  image: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
          aspectRatio: number
        }
      }
    }
  }
}

export type Gallery = {
  _id: string
  title?: string
  images: GalleryImage[]
}

const galleryQuery = `
  *[_type == "gallery"][0]{
    _id,
    title,
    images[] {
      _key,
      title,
      caption,
      altText,
      image {
        asset->{
          _id,
          url,
          metadata { dimensions }
        }
      }
    }
  }
`

export async function getGallery() {
  return sanityClient.fetch<Gallery | null>(
    galleryQuery,
    {},
    {next: {revalidate: 300}},
  )
}
