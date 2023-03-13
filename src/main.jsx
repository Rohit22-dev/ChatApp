import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import authReducer from "./store";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { IKContext } from "imagekitio-react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <IKContext
          publicKey="public_zwkRaHp3R4IiTnTJYSpKQi1N/Do="
          urlEndpoint="https://ik.imagekit.io/octivion"
          transformationPosition="path"
          authenticationEndpoint="http://www.yourserver.com/auth"
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IKContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
