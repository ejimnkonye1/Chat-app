import { configureStore } from "@reduxjs/toolkit";
const initialState =  {
    darkMode: false,
    chat: '',
    image: null
}
const reducer = ( state = initialState, action) => {
switch (action.type) {
    case "SET_MODE":
              return {
            ...state,
            darkMode: action.payload
        }
        case "SET_CHAT":
            return {
          ...state,
          chat: action.payload
      }
      case "SET_IMG":
        return {
      ...state,
      image: action.payload
  }
    default:
        return state;
        
}

}
const store = configureStore({reducer})
export default store;