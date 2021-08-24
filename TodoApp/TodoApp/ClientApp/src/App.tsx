import React, { useState } from 'react';
import { TodoList } from './components';
import TodoContext, { TodoStore } from './contexts/TodoStore';

function App() {

  return (
    <TodoStore>
      <div className="container">
        <TodoList />
      </div>

    </TodoStore>
  );
}

export default App;
