import { configureStore } from "@reduxjs/toolkit";
const initialState =  {
    darkMode: false,
}
const reducer = ( state = initialState, action) => {
switch (action.type) {
    case "SET_MODE":
              return {
            ...state,
            darkMode: action.payload
        }
    

    default:
        return state;
        
}

}
const store = configureStore({reducer})
export default store;