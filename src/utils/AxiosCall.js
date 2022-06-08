import {Alert} from 'react-native';
import axios from 'axios';

// export const baseURL = 'https://demo.octo5.co/';
export const baseURL = 'http://www.mocky.io/v2';

import FlashMessage, {showMessage} from 'react-native-flash-message';

const AxiosCall = async (callObj, dispatch) => {
  const {path, method, data, contentType} = callObj;

  const appheaders = {
    // Authorization: `Basic ${token}`,
    // Authorization: `token ${token}`,
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
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
