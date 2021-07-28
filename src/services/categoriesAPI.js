import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

export const getAllCategoriesAPI = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Product/getAllCategory`,
  });
};

export const getProductByCategory = categoryId => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Product/getProductByCategory?categoryId=${categoryId}`,
  });
};
