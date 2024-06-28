import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Login';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('LoginPage', () => {
    it('matches the snapshot', async () => {
        // Mock any dynamic values or asynchronous data here
    
        const { asFragment } = render(
          <Provider store={store}>
            <Router>
              <LoginPage />
            </Router>
          </Provider>
        );
    
        // Use waitFor for components that have asynchronous operations
        await waitFor(() => {
          expect(asFragment()).toMatchSnapshot();
        });
      });
});