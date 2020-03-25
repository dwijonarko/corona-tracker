
export const getCountry = async () => {
  try {
    let response = await fetch('https://api.kawalcorona.com/');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const getWorld = async url => {
  try {
    let response = await fetch('https://api.kawalcorona.com/' + url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
