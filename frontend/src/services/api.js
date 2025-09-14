import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const commentAPI = {
  getAllComments: async () => {
    const response = await api.get('/comments');
    return response.data;
  },

  getComment: async (id) => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  createComment: async (commentData) => {
    const response = await api.post('/comments', commentData);
    return response.data;
  },

  updateComment: async (id, commentData) => {
    const response = await api.put(`/comments/${id}`, commentData);
    return response.data;
  },

  deleteComment: async (id) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  }
};

export default api;