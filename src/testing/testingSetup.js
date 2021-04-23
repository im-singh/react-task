import React from "react";
import { createStore } from 'redux';
// import 'jest-dom/extend-expect';
import { render as rtlRender } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import { createMemoryHistory } from "history";

import { rootReducer } from "../redux/store";

function render(
    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Router>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </Router>
    }
    let rendered = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
    return { ...rendered, store };
}
// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
