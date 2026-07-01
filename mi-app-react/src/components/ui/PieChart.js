// src/components/ui/PieChart.js
import './PieChart.css';

export const PieChart = ({ data, labels, colors, title }) => {
  // Calcular porcentajes acumulados para el conic-gradient
  const total = data.reduce((sum, val) => sum + val, 0);
  let acumulado = 0;
  
  const segments = data.map((value, index) => {
    const porcentaje = (value / total) * 100;
    const inicio = acumulado;
    acumulado += porcentaje;
    return {
      porcentaje,
      inicio,
      fin: acumulado,
      color: colors[index],
      label: labels[index],
      value,
    };
  });

  const gradientParts = segments.map(s => 
    `${s.color} ${s.inicio}% ${s.fin}%`
  ).join(', ');

  return (
    <div className="pie-chart-container">
      {title && <h4 className="pie-chart-title">{title}</h4>}
      <div className="pie-chart-wrapper">
        <div 
          className="pie-chart-circle"
          style={{ background: `conic-gradient(${gradientParts})` }}
        >
          <div className="pie-chart-center">
            <span className="pie-chart-value">
              {Math.round(segments[0]?.porcentaje || 0)}%
            </span>
          </div>
        </div>
      </div>
      <div className="pie-chart-legend">
        {segments.map((s, i) => (
          <div key={i} className="pie-chart-legend-item">
            <span 
              className="pie-chart-legend-dot" 
              style={{ backgroundColor: s.color }}
            />
            <span className="pie-chart-legend-label">{s.label}</span>
            <span className="pie-chart-legend-value">{s.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};