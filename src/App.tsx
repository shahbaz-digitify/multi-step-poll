import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PollForm from './components/Poll';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <PollForm />
      </div>
    </Provider>
  );
}

export default App;