// src/services/api.js
import axios from 'axios';

const API_URL = 'https://eysen001-tesis-christopher.hf.space';
//const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 180000,
});

export const datasetService = {
  uploadDataset: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload', formData, {  // ← /api/upload
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  processDataset: async () => {
    const response = await api.post('/api/process');  // ← /api/process
    return response.data;
  },

  clearDataset: async () => {
    const response = await api.post('/api/clear-dataset');  // ← /api/clear-dataset
    return response.data;
  },
};

export const predictionService = {
  predictModulo1: async () => {
    const response = await api.post('/api/predict/modulo1');  // ← /api/predict/...
    return response.data;
  },

  predictModulo2: async () => {
    const response = await api.post('/api/predict/modulo2');  // ← /api/predict/...
    return response.data;
  },

  predictModulo3: async () => {
    const response = await api.post('/api/predict/modulo3');  // ← /api/predict/...
    return response.data;
  },
};