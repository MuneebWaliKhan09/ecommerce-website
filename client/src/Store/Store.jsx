import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import rootReducer from "./features/productSlice"

export const store = configureStore({
  reducer: {
    app: rootReducer,
  }
})


export default store