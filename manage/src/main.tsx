import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../styles/index.css';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          siderBg: '#6615de',
          headerBg: '#6615de',
        },
        Menu: {
          darkItemSelectedBg: '#6615de',
        },
      },
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </ConfigProvider>,
);
