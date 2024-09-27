import React from 'react';
import ReactDOM from 'react-dom';
import PasswordCreation from './password-creation';

const App: React.FC = () => {
  return (
    <div>
      <h1>Criação de Senhas</h1>
      <PasswordCreation />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
