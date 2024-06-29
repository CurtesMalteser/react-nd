import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Login';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('LoginPage', () => {
    it('matches the snapshot', async () => {
    
        const { asFragment } = render(
          <Provider store={store}>
            <Router>
              <LoginPage />
            </Router>
          </Provider>
        );

        await waitFor(() => {
          expect(asFragment()).toMatchSnapshot();
        });
      });
});