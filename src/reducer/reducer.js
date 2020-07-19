import {combineReducers} from "redux";
import {reducer as data} from "@root/reducer/data/data";
import {reducer as game} from "@root/reducer/game/game";
import {reducer as user} from "@root/reducer/user/user";
import NameSpace from "@root/reducer/name-space";

const rootReducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GAME]: game,
  [NameSpace.USER]: user,
});

export default rootReducer;
