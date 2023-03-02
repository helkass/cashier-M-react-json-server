import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <React.StrictMode>
         <QueryClientProvider client={queryClient}>
            <Provider store={store}>
               <App />
            </Provider>
         </QueryClientProvider>
      </React.StrictMode>
   </BrowserRouter>
);
