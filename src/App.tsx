import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css';
import CreateAnimal from './pages/CreateAnimal';
import NavBar from './components/NavBar';
import AnimalList from './pages/AnimalList';
import AnimalDetail from './pages/AnimalDetail';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/create" element={<CreateAnimal />} />
        <Route path="/list" element={<AnimalList />} />
        <Route path="/" element={<AnimalList />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
      </Routes>
    </Router>
  );
}

export default App;