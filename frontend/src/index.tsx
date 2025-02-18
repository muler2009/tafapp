import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/index.css"
import Header from './components/common/Header';
import MainLayout from './layout/MainLayout';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Router from './Router/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store} >
    <RouterProvider router={Router()} />
  </Provider>
);

