const APIURL = 'http://192.168.29.50:5000/';
export const fetchRecords = (url) => {
  return new Promise((resolve, reject) => {
    fetch(APIURL + url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => reject(error));
    
  });
};