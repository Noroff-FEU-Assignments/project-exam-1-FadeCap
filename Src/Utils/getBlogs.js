const apiConsumerKey = "ck_6397e4226cdc4c7e7f6b3c10c016a11b04152f39";
const apiConsumerSecret = "cs_cec50018c62529280d1bc97683f3a4045c9d05ae";
const apiUrl = "https://fadedisc.eu/wp-json/wp/v2/posts/?per_page=20";

const getBlogs = async () => {
  try {
    const response = await fetch(apiUrl, {
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
    const blogData = data.map((fields) => ({
      id: fields.id,
      date: fields.date,
      title: fields.title.rendered,
      content: fields.content.rendered,
      mediaLink: fields._links["wp:featuredmedia"][0].href,
      description: fields.excerpt.rendered,
    }));

    for (let i = 0; i < blogData.length; i++) {
      const mediaUrl = await fetch(blogData[i].mediaLink, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(apiConsumerKey + ":" + apiConsumerSecret),
        },
      });
      const data = await mediaUrl.json();

      blogData[i].altText = await data.alt_text;
      blogData[i].image = await data.source_url;
    }
    return await blogData;
  } catch (error) {
    console.error("Error occurred while trying to get blogs.\n", error);
  }
};

export default getBlogs;
