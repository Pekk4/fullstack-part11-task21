import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());

  return response.data;
};

const update = async (newObject) => {
  const url = `${baseUrl}/${newObject.id}`;
  const response = await axios.put(url, newObject, getConfig());

  return response.data;
};

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.delete(url, getConfig());

  return response;
};

export default { getAll, create, setToken, update, deleteBlog };
