import { cleanup, render } from '@testing-library/react';
import GlobalErrorPage from './GlobalErrorPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AnyAction, Store, configureStore } from '@reduxjs/toolkit';
import getDefaultState from '../features/testUtils';

describe('GlobalErrorPage', () => {

    let _store: Store<unknown, AnyAction> | null;

    let store = () => {
        if (_store === null) {
            throw new Error("Store has not been initialized");
        }
        return _store;
    };

    beforeEach(() => {
        _store = configureStore({
            reducer: getDefaultState,
        }
        );
    });

    afterEach(() => {
        _store = null;
        cleanup();
    });

    it('should match the snapshot', () => {
        const { asFragment } = render(
            <Provider store={store()}>
                <Router>
                    <GlobalErrorPage />
                </Router>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});