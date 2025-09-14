import React from 'react';
import './App.css';
import CommentList from './components/CommentList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Comment System</h1>
        <p>BOBYARD </p>
      </header>
      
      <main className="App-main">
        <CommentList />
      </main>
    </div>
  );
}

export default App;