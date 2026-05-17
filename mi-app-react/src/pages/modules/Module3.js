// src/pages/modules/Module3.js
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { predictionService } from '../../services/api';

export const Module3 = () => {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('a');

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionService.predictModulo3();
      setResultado(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al predecir');
    } finally {
      setLoading(false);
    }
  };

  const data = resultado;
  const metadata = data?.metadata;
  const modeloActivo = activeTab === 'a' ? data?.modelo_jugador_a :
                       activeTab === 'b' ? data?.modelo_jugador_b :
                       data?.modelo_combinado;

  return (
    <Card>
      <h3>♟️ Módulo 3: Fases de Juego + ECO + Calibración</h3>
      <p>Random Forest con errores por fase (apertura, medio, final) y familia de apertura ECO.</p>
      
      {metadata && (
        <div style={{ margin: '15px 0', padding: '15px', background: '#f0f4f8', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 5px' }}>
            <strong>⚪ {metadata.jugador_a}</strong> (ELO: {metadata.rating_a})
          </p>
          <p style={{ margin: '0 0 5px' }}>
            <strong>⚫ {metadata.jugador_b}</strong> (ELO: {metadata.rating_b})
          </p>
          <p style={{ margin: 0, color: metadata.diferencia_rating > 0 ? '#16a34a' : '#dc2626' }}>
            Diferencia: {metadata.diferencia_rating > 0 ? '+' : ''}{metadata.diferencia_rating}
          </p>
        </div>
      )}

      <Button onClick={handlePredict} disabled={loading}>
        {loading ? '⏳ Procesando predicción...' : '🎯 Hallar resultado'}
      </Button>

      {error && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#f8d7da', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
          <p style={{ color: '#721c24', margin: 0 }}>❌ {error}</p>
        </div>
      )}

      {data && (
        <div style={{ marginTop: '20px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
            {['a', 'b', 'media'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: activeTab === tab ? '#ff512f' : '#e5e7eb',
                  color: activeTab === tab ? 'white' : '#374151',
                  fontWeight: 'bold',
                  fontSize: '0.9em'
                }}
              >
                {tab === 'a' ? '🔵 Jugador A' : tab === 'b' ? '🔴 Jugador B' : '🟣 Combinado'}
              </button>
            ))}
          </div>

          {/* Métricas */}
          {modeloActivo?.metricas && (
            <div style={{ marginBottom: '15px', padding: '12px', background: '#fef3c7', borderRadius: '8px', fontSize: '0.85em' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>📊 Métricas del modelo:</p>
              <span>AUC-ROC: {modeloActivo.metricas.auc_roc} | </span>
              <span>Log-Loss: {modeloActivo.metricas.log_loss} | </span>
              <span>Brier: {modeloActivo.metricas.brier_score}</span>
            </div>
          )}

          {/* Estilo por fases */}
          {modeloActivo?.estilo_fases && (
            <div style={{ marginBottom: '15px', padding: '12px', background: '#e0f2fe', borderRadius: '8px', fontSize: '0.85em' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>🎯 Errores por fase (ventana 20):</p>
              <span>🐣 Apertura: {modeloActivo.estilo_fases.error_apertura_promedio} | </span>
              <span>🦅 Medio: {modeloActivo.estilo_fases.error_medio_promedio} | </span>
              <span>🦉 Final: {modeloActivo.estilo_fases.error_final_promedio}</span>
              {modeloActivo.apertura_default && (
                <p style={{ margin: '5px 0 0' }}>📖 Apertura: {modeloActivo.apertura_default}</p>
              )}
            </div>
          )}

          {/* Resultado */}
          {modeloActivo && (
            <div style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontWeight: 'bold', marginTop: 0 }}>{modeloActivo.nombre_modelo}</p>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '120px', textAlign: 'center', padding: '10px', background: '#dcfce7', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.9em', margin: 0 }}>🏆 Victoria {metadata.jugador_a}</p>
                  <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '5px 0', color: '#16a34a' }}>
                    {modeloActivo.prediccion.prob_victoria}%
                  </p>
                </div>
                
                <div style={{ flex: 1, minWidth: '120px', textAlign: 'center', padding: '10px', background: '#fef3c7', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.9em', margin: 0 }}>🤝 Tablas</p>
                  <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '5px 0', color: '#d97706' }}>
                    {modeloActivo.prediccion.prob_tablas}%
                  </p>
                </div>
                
                <div style={{ flex: 1, minWidth: '120px', textAlign: 'center', padding: '10px', background: '#fee2e2', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.9em', margin: 0 }}>❌ Victoria {metadata.jugador_b}</p>
                  <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '5px 0', color: '#dc2626' }}>
                    {modeloActivo.prediccion.prob_derrota}%
                  </p>
                </div>
              </div>

              {/* Veredicto */}
              {modeloActivo.veredicto && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  background: modeloActivo.veredicto.includes(metadata.jugador_a) ? '#dcfce7' : 
                              modeloActivo.veredicto.includes('TABLAS') ? '#fef3c7' : '#fee2e2',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontWeight: 'bold', margin: 0, fontSize: '1.1em' }}>
                    🏆 {modeloActivo.veredicto}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};