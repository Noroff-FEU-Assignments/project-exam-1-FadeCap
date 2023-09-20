const apiConsumerKey = "ck_6397e4226cdc4c7e7f6b3c10c016a11b04152f39";
const apiConsumerSecret = "cs_cec50018c62529280d1bc97683f3a4045c9d05ae";
const apiUrl = "https://fadedisc.eu/wp-json/wp/v2/posts/";

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

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Error occurred while trying to get blogs.\n", error);
  }
};

export default getBlogs;
