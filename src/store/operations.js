import axios from 'axios';

axios.defaults.baseURL = 'https://65ef6c1bead08fa78a506eb5.mockapi.io/api/v1';

export const fetchContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const addContact = async body => {
  const { data } = await axios.post('/contacts', body);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
