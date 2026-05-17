// src/components/ui/Tabs.js
import './Tabs.css';

export const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${activeTab === index + 1 ? 'active' : ''}`}
          onClick={() => onTabChange(index + 1)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};