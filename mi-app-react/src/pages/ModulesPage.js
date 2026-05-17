// src/pages/ModulesPage.js
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Module1 } from './modules/Module1';
import { Module2 } from './modules/Module2';
import { Module3 } from './modules/Module3';

export const ModulesPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div id="modulos">
      <Button variant="back" onClick={() => onNavigate('home')}>
        ⬅ Volver a Inicio
      </Button>

      <Tabs 
        tabs={['Módulo 1', 'Módulo 2', 'Módulo 3']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 1 && <Module1 />}
      {activeTab === 2 && <Module2 />}
      {activeTab === 3 && <Module3 />}
    </div>
  );
};