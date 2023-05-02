import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/components/Redux/Store';
import NavScreens from './src/components/screens/NavScreens';


const App = () => {
  return (
    <Provider store={store}>
    <NavScreens/>
    </Provider>
  );
};

export default App;
