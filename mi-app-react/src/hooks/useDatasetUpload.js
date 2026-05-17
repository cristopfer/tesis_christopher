// src/hooks/useDatasetUpload.js
import { useState } from 'react';
import { datasetService } from '../services/api';

export const useDatasetUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [processResult, setProcessResult] = useState(null);
  const [isClearing, setIsClearing] = useState(false);
  const [clearResult, setClearResult] = useState(null);
  const [error, setError] = useState(null);

  const uploadDataset = async (file) => {
    if (!file.name.endsWith('.zip')) {
      setError('Solo se permiten archivos ZIP');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadResult(null);
    setProcessResult(null);

    try {
      const response = await datasetService.uploadDataset(file);
      setUploadResult(response);
      return response;
    } catch (err) {
      setError(err.message || 'Error al subir el archivo');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // NUEVO: Procesar dataset
  const processDataset = async () => {
    setIsProcessing(true);
    setError(null);
    setProcessResult(null);

    try {
      const response = await datasetService.processDataset();
      setProcessResult(response);
      return response;
    } catch (err) {
      setError(err.message || 'Error al procesar el dataset');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearDataset = async () => {
    if (!window.confirm('¿Estás seguro? Esto eliminará TODOS los archivos de la carpeta dataset (CSVs y PGNs).')) {
      return;
    }
    
    setIsClearing(true);
    setError(null);
    
    try {
      const response = await datasetService.clearDataset();
      setClearResult(response);
      setUploadResult(null);
      setProcessResult(null);
      return response;
    } catch (err) {
      setError(err.message || 'Error al limpiar el dataset');
    } finally {
      setIsClearing(false);
    }
  };
  

  return {
    isUploading,
    isProcessing,
    uploadResult,
    processResult,
    error,
    uploadDataset,
    processDataset,
    isClearing,
    clearResult,
    clearDataset,
  };
};