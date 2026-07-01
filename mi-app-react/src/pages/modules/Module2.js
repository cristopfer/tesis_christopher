// src/pages/modules/Module2.js
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { predictionService } from '../../services/api';
import { PieChart } from '../../components/ui/PieChart';

export const Module2 = () => {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('a');

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionService.predictModulo2();
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
      <h3>📈 Módulo 2: Enfoque Completo (Estilo + Calibración)</h3>
      <p>Random Forest con ventana móvil de estilo (20 partidas) y calibración de Platt.</p>
      
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
          {/* Tabs para elegir modelo */}
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

          {/* Métricas del modelo */}
          {modeloActivo?.metricas && (
            <div style={{ marginBottom: '15px', padding: '12px', background: '#fef3c7', borderRadius: '8px', fontSize: '0.85em' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>📊 Métricas del modelo:</p>
              <span>AUC-ROC: {modeloActivo.metricas.auc_roc} | </span>
              <span>Log-Loss: {modeloActivo.metricas.log_loss} | </span>
              <span>Brier: {modeloActivo.metricas.brier_score}</span>
            </div>
          )}

          {/* Estilo del jugador */}
          {modeloActivo?.estilo_ventana && (
            <div style={{ marginBottom: '15px', padding: '12px', background: '#e0f2fe', borderRadius: '8px', fontSize: '0.85em' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px' }}>🎨 Estilo (ventana 20 partidas):</p>
              <span>Blunders: {modeloActivo.estilo_ventana.blunders_promedio} | </span>
              <span>Mistakes: {modeloActivo.estilo_ventana.mistakes_promedio} | </span>
              <span>CPL: {modeloActivo.estilo_ventana.cp_loss_promedio} | </span>
              <span>Ataques: {modeloActivo.estilo_ventana.ataque_rey_promedio}</span>
            </div>
          )}

          {/* Resultado del modelo activo */}
          {modeloActivo && (
            <div style={{ padding: '15px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontWeight: 'bold', marginTop: 0, marginBottom: '15px' }}>{modeloActivo.nombre_modelo}</p>
              
              <PieChart 
                data={[
                  modeloActivo.prediccion.prob_victoria,
                  modeloActivo.prediccion.prob_tablas,
                  modeloActivo.prediccion.prob_derrota,
                ]}
                labels={[
                  `🏆 Victoria ${metadata.jugador_a}`,
                  '🤝 Tablas',
                  `❌ Victoria ${metadata.jugador_b}`,
                ]}
                colors={['#16a34a', '#d97706', '#dc2626']}
              />

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