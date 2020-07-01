import ReactDOM from "react-dom";
import App from "@root/components/app/app";
import {createStore} from "redux";
import {reducer} from "@root/reducer";
import {Provider} from "react-redux";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
