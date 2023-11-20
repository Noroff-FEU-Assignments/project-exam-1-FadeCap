const apiConsumerKey = "ck_6397e4226cdc4c7e7f6b3c10c016a11b04152f39";
const apiConsumerSecret = "cs_cec50018c62529280d1bc97683f3a4045c9d05ae";
const apiUrl = "https://fadedisc.eu/wp-json/wp/v2/posts/?per_page=12&_embed=wp:featuredmedia";

const getBlogs = async () => {
  try {
    console.time('Posts')
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
    console.log(data)
    const blogData = data.map((fields) => ({
      id: fields.id,
      date: fields.date,
      title: fields.title.rendered,
      content: fields.content.rendered,
      mediaLink: fields._links["wp:featuredmedia"][0].href,
      description: fields.excerpt.rendered,
      altText: fields._embedded['wp:featuredmedia'][0].alt_text,
      image: fields._embedded['wp:featuredmedia'][0].source_url
    }));
    console.log(blogData)
    console.timeEnd('Posts')
    return await blogData;
  } catch (error) {
    console.error("Error occurred while trying to get blogs.\n", error);
  }
};

export default getBlogs;