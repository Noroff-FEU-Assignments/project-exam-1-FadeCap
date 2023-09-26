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
    
    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error("Error occurred while trying to get a product.\n", error);
  }
};

export default getBlogById;
