import { gql, request } from "graphql-request";

const ENDPOINT = import.meta.env.CMS_URL;

const POST_SUMMARY_QUERY = `
  title
  slug {
    current
  }
  keywords
  longDescription
  author {
    name
    image {
      asset {
        url        
      }
    }
  }
  featuredImage {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
  featuredImageAlt
  category
  publishedAt
`;

export async function getAllPosts(): Promise<SanityPostPreview[]> {
  const { allPost } = await request(
    ENDPOINT,
    gql`
    query {
      allPost(sort: { publishedAt: DESC }) {
        ${POST_SUMMARY_QUERY}
      }
    }
  `
  );

  return allPost;
}

export const getPostsByCategory = (category: string) =>
  request(
    ENDPOINT,
    gql`
    query {
      allPost(
        where: { category: { eq: "${category}"} }
        sort: { publishedAt: DESC }
      ) {        
        ${POST_SUMMARY_QUERY}
      }
    }
  `
  );

export const getAllCategories = () =>
  request(
    ENDPOINT,
    gql`
      query {
        allPost(sort: { publishedAt: DESC }) {
          category
        }
      }
    `
  );

export async function getAllPaths() {
  const { allPost } = await request(
    ENDPOINT,
    gql`
      query {
        allPost(sort: { publishedAt: DESC }) {
          title
          slug {
            current
          }
        }
      }
    `
  );

  return allPost.map((item: SanityPathType) => ({
    params: {
      slug: item.slug.current,
    },
    props: { title: item.title },
  }));
}

export async function getPost(slug: string) {
  const { allPost } = await request(
    ENDPOINT,
    gql`
        query {
          allPost(where: { slug: { current: { eq: "${slug}" } } }) {        
            ${POST_SUMMARY_QUERY}
            body
          }
        }
      `
  );

  return allPost?.[0];
}
