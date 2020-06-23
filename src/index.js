import ReactDOM from "react-dom";
import App from "@root/components/app/app";
import {Settings} from "@root/consts";
import questions from "@root/mocks/questions";

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
