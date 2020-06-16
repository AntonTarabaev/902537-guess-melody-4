import ReactDOM from "react-dom";
import App from "@/components/app/app";
import {Settings} from "@/consts";

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
    />,
    document.querySelector(`#root`)
);
