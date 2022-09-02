type SanityPathType = {
  slug: {
    current: string;
  };
  title: string;
};

type SanityImageMetadata = {
  dimensions: {
    width: number;
    height: number;
  };
  lqip: string;
};

type SanityPostPreview = {
  title: string;
  slug: {
    current: string;
  };
  keywords: string;
  longDescription: string;
  author: {
    name: string;
    image: {
      asset: {
        url: string;
      };
    };
  };
  featuredImage: {
    asset: {
      url: string;
      metadata: SanityImageMetadata;
    };
  };
  featuredImageAlt: string;
  category: string;
  publishedAt: string;
};
