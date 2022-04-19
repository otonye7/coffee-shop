import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: "mrsrZmLCuCZd2nfpq0y0diUl8a0H5M2qE4Z0K585z-w"
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return (
      'https://api.foursquare.com/v3/places/nearby?' +
      `ll=${latLong}&` +
      `query=${query}&` +
      `limit=${limit}&` +
      'v=20220105&'
  );
}

export const fetchCoffeeStores = async (latLong='43.65267326999575,-79.39545615725015', limit = 6) => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40
  })
  const unsplashResult = photos.response.results
  const photosResponse = unsplashResult.map((result) => result.urls['small'])
  const response = await fetch(
    getUrlForCoffeeStores(
        latLong,
        'coffee stores',
        limit
    ), {
          headers: {
            'Authorization': "fsq30g9iO08Q8DS2fdGcHQL8WWizU9fw5mZrGukEalq6BCM="
          }
        })
      const data = await response.json();

      const transformedData = data?.results?.map((venue) => {
        return {
            id: venue.fsq_id,
            ...venue
        }
    }) || [];

    return transformedData.map((venue, idx) => {
      return {
          ...venue,
          imgUrl: photosResponse[idx]
      }
  });
}