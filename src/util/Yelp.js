const clientId = 'Rd_MDUaGoniGd_gUZ6CwHg';
const secret = 'bX1tMz5qCVxKAOoZOwVsyFqACGrfMs75tWhffKf4E4LS3cHKkycdmZCboKuVh29w';
let accessToken = '';

const Yelp = {

  getAccessToken() {
    if (accessToken){
      return new Promise(resolve => resolve(accessToken));
    } return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
      {method: 'POST'}
    ).then(response => response.json()).then(jsonResponse => {
      return accessToken = jsonResponse.access_token});
      return accessToken;
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(()=>
    {return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {headers: {'Authorization': `Bearer ${accessToken}`}}
    ).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.businesses){
        return jsonResponse.businesses.map(business => { return {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.location.categories,
          rating: business.rating,
          reviewCount: business.review_count
        }})
      }
    })
  });
}
}


export default Yelp;
