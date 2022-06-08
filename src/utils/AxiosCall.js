import axios from 'axios';

export const baseURL = 'https://www.mocky.io/v2';

const AxiosCall = async (callObj, dispatch) => {
  const {path, method, data, contentType} = callObj;

  const appheaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'oemanager/9 CFNetwork/1312 Darwin/20.6.0',
  };

  const headers = appheaders;

  let url = `${baseURL}/${path}`;

  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      json: true,
      timeout: 18000,
      // timeout: 100,
    });
    const result = response && response.data;
    return result;
  } catch (error) {
    if (error.response.status == 401) {
      //  this can handle a universal function of the app when there is 401 status code
    }
    if (error.response.status == 404) {
      //  this can handle a universal function of the app when there is 401 status code
    }
    if (error.response.status == 403) {
      //  this can handle a universal function of the app when there is 401 status code
    }
    throw error;
  }
};

export default AxiosCall;
