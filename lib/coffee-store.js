// headers: {
//   'Authorization': "fsq30g9iO08Q8DS2fdGcHQL8WWizU9fw5mZrGukEalq6BCM="
// }

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return (
      'https://api.foursquare.com/v3/places/nearby?' +
      `ll=${latLong}&` +
      `query=${query}&` +
      `limit=${limit}&` +
      'v=20220105&'
  );
}

export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores(
        '43.65267326999575,-79.39545615725015',
        'coffee stores',
        6
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
          ...venue
      }
  });
}