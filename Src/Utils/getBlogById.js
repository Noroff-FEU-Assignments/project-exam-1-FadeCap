const apiConsumerKey = "ck_6397e4226cdc4c7e7f6b3c10c016a11b04152f39";
const apiConsumerSecret = "cs_cec50018c62529280d1bc97683f3a4045c9d05ae";
const apiUrl = "https://fadedisc.eu/wp-json/wp/v2/posts/";

const getBlogById = async (id) => {
  const blogUrl = apiUrl + id;
  try {
    const response = await fetch(blogUrl, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(apiConsumerKey + ":" + apiConsumerSecret),
      },
    });
    if (!response.ok) {
      const { status, statusText, url } = response;
      throw new Error(JSON.stringify({ status, statusText, url }));
    }
    const data = await response.json();
    const blogData = {
      id: data.id,
      date: data.date,
      title: data.title.rendered,
      content: data.content.rendered,
      mediaLink: data._links["wp:featuredmedia"][0].href,
      description: data.excerpt.rendered,
    };

    const mediaUrl = await fetch(blogData.mediaLink, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(apiConsumerKey + ":" + apiConsumerSecret),
      },
    });
    const mediaData = await mediaUrl.json();

    blogData.altText = mediaData.alt_text;
    blogData.image = mediaData.source_url;

    return blogData;
  } catch (error) {
    console.error("Error occurred while trying to get a blog.\n", error);
    throw error;
  }
};

export default getBlogById;
