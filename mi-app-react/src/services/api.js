// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 120000, // 60 segundos para procesamiento
});

export const datasetService = {
  uploadDataset: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // NUEVO: Procesar dataset
  processDataset: async () => {
    const response = await api.post('/process');
    return response.data;
  },

  // NUEVO: Limpiar dataset
  clearDataset: async () => {
    const response = await api.post('/clear-dataset');
    return response.data;
  },
};

// NUEVO: Servicio para predicciones
export const predictionService = {
  predictModulo1: async () => {
    const response = await api.post('/predict/modulo1');
    return response.data;
  },

  predictModulo2: async () => {
    const response = await api.post('/predict/modulo2');
    return response.data;
  },

  predictModulo3: async () => {
    const response = await api.post('/predict/modulo3');
    return response.data;
  },
};