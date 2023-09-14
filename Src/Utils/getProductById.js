const apiConsumerKey = "ck_6397e4226cdc4c7e7f6b3c10c016a11b04152f39";
const apiConsumerSecret = "cs_cec50018c62529280d1bc97683f3a4045c9d05ae";
const apiUrl = "fadedisc.eu/wp-json/wp/v2/posts/";



const getProductById = async (id) => {
  const productUrl = apiUrl + id
    try {
        const response = await fetch(productUrl, {
        method:"GET",
        headers:{
            "Authorization": "Basic " + btoa(apiConsumerKey + ":" + apiConsumerSecret)
        }
      })
      if (!response.ok) {
        const {status, statusText, url} = response
        throw new Error(JSON.stringify({status, statusText, url}));
      }

      const product = await response.json()
      return product
    } catch (error) {
        console.error("Error occurred while trying to get a product.\n", error);
    }
}

export default getProductById;



