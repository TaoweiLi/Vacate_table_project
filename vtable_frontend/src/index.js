import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import { createBrowserHistory } from 'history'
import './index.scss';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const hisotry = createBrowserHistory()

function Root() {
  return (
    <>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter history={hisotry}>
            <App />
            {/* <Carrot /> */}
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </>
  );
}

const renderApplication = () => {
  const div = ReactDOM.createRoot(document.getElementById("root"));
  div.render(
    <>
      {/* <div>
        <Favicon url='https://raw.githubusercontent.com/TaoweiLi/Vacate_table_project/main/vtable_frontend/asset/fav_icon.png'/>
      </div> */}
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </>
  )
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}