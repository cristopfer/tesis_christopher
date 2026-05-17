// src/pages/HomePage.js
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useDatasetUpload } from '../hooks/useDatasetUpload';
import './HomePage.css';

export const HomePage = ({ onNavigate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { 
    isUploading, 
    isProcessing,
    isClearing,
    uploadResult, 
    processResult,
    clearResult,
    error, 
    uploadDataset,
    processDataset,
    clearDataset
  }  = useDatasetUpload();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo ZIP');
      return;
    }
    await uploadDataset(selectedFile);
  };

  const handleProcess = async () => {
    await processDataset();
  };

  return (
    <div id="home">
      <Card>
        <h2 className="title-main">Bienvenido al Sistema Predictivo</h2>
        <p className="description">
          Esta plataforma permite analizar partidas de ajedrez en formato PGN y generar predicciones de victoria entre jugadores.
          Utiliza modelos avanzados de Machine Learning para evaluar variables como rating, estilo de juego, errores y fases de la partida.
          <br /><br />
          Podras cargar tus propios datasets, procesarlos automaticamente y obtener resultados detallados en distintos modulos de analisis.
        </p>
        <Button onClick={() => onNavigate('modules')}>
          🚀 Ir a Modulos de Analisis
        </Button>
      </Card>

      <Card>
        <h3>📂 Carga de Dataset</h3>
        <p style={{ color: '#666', marginBottom: '15px', fontSize: '0.95em' }}>
          Sube un archivo <strong>.zip</strong> con partidas en formato <strong>PGN</strong>. 
          Luego procesalo para generar el CSV con caracteristicas extraidas.
        </p>
        
        <input 
          type="file" 
          accept=".zip"
          onChange={handleFileChange}
          disabled={isUploading || isProcessing}
        />
        
        {selectedFile && (
          <p style={{ marginTop: '10px', color: '#333' }}>
            📄 Archivo seleccionado: <strong>{selectedFile.name}</strong> 
            ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}

        <br />
        
        <Button 
          onClick={handleUpload}
          disabled={!selectedFile || isUploading || isProcessing}
        >
          {isUploading ? '⏳ Subiendo...' : '📤 Subir Dataset'}
        </Button>

        {/* NUEVO: Boton Procesar Dataset */}
        {uploadResult && (
          <Button 
            onClick={handleProcess}
            disabled={isProcessing}
            style={{ marginLeft: '10px' }}
          >
            {isProcessing ? '⏳ Procesando...' : '⚙️ Procesar Dataset'}
          </Button>
        )}

        {/* NUEVO BOTÓN: Limpiar Dataset */}
        <Button 
          onClick={clearDataset}
          variant="danger"
          disabled={isClearing || isUploading || isProcessing}
        >
          {isClearing ? '⏳ Limpiando...' : '🗑️ Limpiar Dataset'}
        </Button>

        {isUploading && (
          <div style={{ marginTop: '15px' }}>
            <p>Estado: Subiendo archivo...</p>
            <ProgressBar value={50} />
          </div>
        )}

        {isProcessing && (
          <div style={{ marginTop: '15px' }}>
            <p>Estado: Procesando partidas y generando CSV...</p>
            <ProgressBar value={70} />
          </div>
        )}

        {uploadResult && (
          <div style={{ 
            marginTop: '15px', 
            padding: '15px', 
            background: '#d4edda', 
            borderRadius: '8px',
            border: '1px solid #c3e6cb'
          }}>
            <p style={{ color: '#155724', margin: 0 }}>
              ✅ {uploadResult.message}
            </p>
            {uploadResult.files_extracted && (
              <p style={{ color: '#155724', fontSize: '0.9em', marginTop: '5px' }}>
                📊 Archivos extraidos: {uploadResult.files_extracted}
              </p>
            )}
          </div>
        )}

        {processResult && (
          <div style={{ 
            marginTop: '15px', 
            padding: '15px', 
            background: '#d4edda', 
            borderRadius: '8px',
            border: '1px solid #c3e6cb'
          }}>
            <p style={{ color: '#155724', margin: 0 }}>
              ✅ {processResult.message}
            </p>
            <p style={{ color: '#155724', fontSize: '0.9em', marginTop: '5px' }}>
              📊 Partidas procesadas: {processResult.total_partidas}
            </p>
            <p style={{ color: '#155724', fontSize: '0.9em', marginTop: '5px' }}>
              👤 Jugadores: {processResult.total_jugadores}
            </p>
            <p style={{ color: '#155724', fontSize: '0.9em', marginTop: '5px' }}>
              📁 CSV: {processResult.csv_path}
            </p>
          </div>
        )}

        {error && (
          <div style={{ 
            marginTop: '15px', 
            padding: '15px', 
            background: '#f8d7da', 
            borderRadius: '8px',
            border: '1px solid #f5c6cb'
          }}>
            <p style={{ color: '#721c24', margin: 0 }}>
              ❌ {error}
            </p>
          </div>
        )}
        {clearResult && (
          <div style={{ 
            marginTop: '15px', 
            padding: '15px', 
            background: '#fff3cd', 
            borderRadius: '8px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ color: '#856404', margin: 0 }}>
              ✅ {clearResult.message}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};   
        
        