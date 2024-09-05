import React from 'react';
import ReactDOM from 'react-dom'; // Import from 'react-dom'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './react-redux/store.jsx'; // Make sure the path to your store file is correct
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render( // Use ReactDOM.render instead of createRoot
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Provider>,
  document.getElementById('root')
);

export default App;
