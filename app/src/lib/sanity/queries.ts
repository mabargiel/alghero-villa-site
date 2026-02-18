import { sanityClient } from "./client";

export type GalleryImage = {
  _key: string;
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
};

export type Gallery = {
  _id: string;
  images: GalleryImage[];
};

export type MediaImage = {
  altText: string;
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
};

export type Hero = {
  _id: string;
  title?: string;
  videoUrl?: string;
  video?: {
    asset: {
      url: string;
    };
  };
  videoLight?: {
    asset: {
      url: string;
    };
  };
  images?: MediaImage[];
  mobileImage?: MediaImage;
};

export type HomeSection = {
  _id: string;
  sectionKey: "property" | "interiors" | "garden" | "location";
  image?: MediaImage;
};

export type MiniGallery = {
  _id: string;
  images: GalleryImage[];
};

export type AreaHighlight = {
  _id: string;
  images?: MediaImage[];
};

export type PricingPromotion = {
  _key: string;
  label: string;
  startDate: string;
  endDate: string;
  type: "percentage" | "fixed";
  value: number;
};

export type PricingRange = {
  _key: string;
  label: string;
  startDate: string;
  endDate: string;
  pricePerDay: number;
  promotions?: PricingPromotion[];
};

export type PricingConfig = {
  _id: string;
  baseRanges: PricingRange[];
  perks?: string[];
};

const galleryQuery = `
  *[_type == "gallery"][0]{
    _id,
    images[] {
      _key,
      asset->{
        _id,
        url,
        metadata { dimensions }
      }
    }
  }
`;

const heroQuery = `
  *[_type == "hero"][0]{
    _id,
    title,
    videoUrl,
    video {
      asset->{
        url
      }
    },
    videoLight {
      asset->{
        url
      }
    },
    images[] {
      altText,
      image {
        asset->{
          _id,
          url,
          metadata { dimensions }
        }
      }
    },
    mobileImage {
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
`;

const homeSectionsQuery = `
  *[_type == "homeSection"]{
    _id,
    sectionKey,
    image {
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
`;

const miniGalleryQuery = `
  *[_type == "miniGallery"][0]{
    _id,
    images[] {
      _key,
      asset->{
        _id,
        url,
        metadata { dimensions }
      }
    }
  }
`;

const areaHighlightQuery = `
  *[_type == "areaHighlight"][0]{
    _id,
    images[] {
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
`;

export async function getAreaHighlights() {
  return sanityClient.fetch<AreaHighlight | null>(
    areaHighlightQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getGallery() {
  return sanityClient.fetch<Gallery | null>(
    galleryQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getHero() {
  return sanityClient.fetch<Hero | null>(
    heroQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getHomeSections() {
  return sanityClient.fetch<HomeSection[]>(
    homeSectionsQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getMiniGallery() {
  return sanityClient.fetch<MiniGallery | null>(
    miniGalleryQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

const pricingConfigQuery = `
  *[_type == "pricingConfig"][0]{
    _id,
    baseRanges[] {
      _key,
      label,
      startDate,
      endDate,
      pricePerDay,
      promotions[] {
        _key,
        label,
        startDate,
        endDate,
        type,
        value
      }
    },
perks
  }
`;

export async function getPricingConfig() {
  return sanityClient.fetch<PricingConfig | null>(
    pricingConfigQuery,
    {},
    { next: { revalidate: 300 } },
  );
}
