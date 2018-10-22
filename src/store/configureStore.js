import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { loginState } from "../components/User";
import { AlbumsList } from "../components/Home";
import { Ranks } from "../components/Rank";
import { Artists } from "../components/Artists";
import { HotSearch } from "../components/Search";
import { PlayListState } from "../components/Play";
import { LikeSongsListState } from "../components/Play";
import { MusicState, VolumeState, FavorState,IsPlayState,LyricsUpdate, progress, audio } from "./../components/Play/music.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  loginState,
  AlbumsList,
  Ranks,
  Artists,
  HotSearch,
  PlayListState,
  LikeSongsListState,
  MusicState,
  VolumeState,
  FavorState,
  IsPlayState,
  LyricsUpdate,
  progress,
  audio
});
const configuretore = initialState => {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};

export default configuretore;
