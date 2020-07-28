import ReactDOM from "react-dom";
import App from "@root/components/app/app";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "@root/reducer/reducer";
import {Provider} from "react-redux";
import {createAPI} from "@root/api";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "@root/reducer/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "@root/reducer/user/user";
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
