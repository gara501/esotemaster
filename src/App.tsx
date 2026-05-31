import { Navigate, Route, Routes } from 'react-router-dom';

import { LibraryOraclePage } from './pages/LibraryOraclePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LibraryOraclePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
