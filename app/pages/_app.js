import global from "./style.css";
import { store, persistor, wrapper } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";


export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

// export default wrapper.withRedux(MyApp);



