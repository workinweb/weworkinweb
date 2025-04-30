const domain = import.meta.env.WP_DOMAIN;
const apiURL = `${domain}/wp-json/wp/v2`;

export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiURL}/pages?slug=${slug}`);

  console.log(`${apiURL}/pages?slug=${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch pages");
  }

  const [data] = await response.json();

  return data;
};

export const getLatestPosts = async ({ perPage = 10 }) => {
  const response = await fetch(`${apiURL}/posts?per_page=${perPage}&_embed`);
  console.log(`${apiURL}/posts?per_page=${perPage}&_embed`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  const posts = data.map((post) => {
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug,
    } = post;

    const featuredImage = post._embedded["wp:featuredmedia"][0].source_url;

    return { title, excerpt, content, date, slug, featuredImage };
  });

  return posts;
};

export const getPostInfo = async (slug: string) => {
  const response = await fetch(`${apiURL}/posts?slug=${slug}&_embed`);

  console.log(`${apiURL}/posts?slug=${slug}&_embed`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const [data] = await response.json();

  const {
    title: { rendered: title },
    excerpt: { rendered: excerpt },
    content: { rendered: content },
    yoast_head_json: seo,
    date,
  } = data;

  const featuredImage = data._embedded["wp:featuredmedia"][0];

  return {
    title,
    excerpt,
    content,
    date,
    slug,
    seo,
    featuredImage: {
      url: featuredImage.source_url,
      width: featuredImage.media_details.width,
      height: featuredImage.media_details.height,
    },
  };
};
