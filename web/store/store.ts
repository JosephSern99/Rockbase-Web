import { configureStore } from "@reduxjs/toolkit";
import contactFormReducer from "@/store/slices/contact-form-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      contactForm: contactFormReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
