import axios from 'axios';

export const fetchComments = async () => {
  const res = await axios.get('http://localhost:8000/api/comment');

  return res.data;
};

export const saveComment = comment => {};
