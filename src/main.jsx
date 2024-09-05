import { createRoot } from 'react-dom/client'; // Correct import statement
import App from './App.jsx'; // Ensure this path is correct
import { Provider } from 'react-redux';
import store from './react-redux/store.jsx'; // Ensure this path is correct
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ensure the element with id 'root' exists in your HTML
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
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
    </Provider>
  );
} else {
  console.error("Root element not found");
}

// Remove this line if this file is not intended to export App
// export default App;
