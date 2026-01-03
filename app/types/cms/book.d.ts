import type { SanityDocument } from "@sanity/client";

type SanityBook = SanityDocument & {
  title: string;
  slug: {
    current: string;
  };
  cover?: SanityImageSource;
  publishedAt: string;
  author: SanityAuthor;
  categories: SanityCategory[];
};

type SanityCategory = SanityDocument & {
  label: string;
  slug: {
    current: string;
  };
};

type SanityAuthor = SanityDocument & {
  name: string;
  slug: {
    current: string;
  };
  portrait?: SanityImageSource;
};
