import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Octadrum from './components/Octadrum';
import Octapad from './components/Octapad';
import Sample from './components/Sample';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Octapad />} />
      <Route path="/console" element={<Octadrum />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;