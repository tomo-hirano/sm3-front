import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import EmployeeManagement from './EmployeeManagement.jsx';
import EmployeeEdit from './EmployeeEdit.jsx'; // 新しく作成するコンポーネント

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeManagement />} />
        <Route path="/edit" element={<EmployeeEdit />} />
        <Route path="/register" element={<EmployeeEdit />} /> {/* 新規登録用のルート */}
      </Routes>
    </Router>
  </StrictMode>,
);
