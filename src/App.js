import React from 'react';
import { Provider } from 'react-redux'
import configureStore from "./Store"
import Users from "./Users/DumbComponents"
import './App.css';

const store = configureStore()

function App() {
  return (
    <div className="App">
      <h1> hello world</h1>
      <Provider store={store}>
        <div className="App">
          <Users />
        </div>
      </Provider>
    </div>
  );
}

export default App;
