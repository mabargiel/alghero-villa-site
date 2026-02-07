import {sanityClient} from './client'

export type GalleryImage = {
  _key: string
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
  images: GalleryImage[]
}

const galleryQuery = `
  *[_type == "gallery"][0]{
    _id,
    images[] {
      _key,
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
