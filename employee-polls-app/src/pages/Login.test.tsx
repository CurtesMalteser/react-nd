import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  it('renders alert wrong credentials if password is incorrect', async () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const dropdown = getByRole('combobox');
    const buttonLogin = getByRole('button', { name: 'Login' });
    const buttonCancel = getByRole('button', { name: 'Cancel' });

    expect(buttonCancel).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    await userEvent.selectOptions(dropdown, 'johndoe');
    await userEvent.click(buttonLogin);


    await waitFor(() => {
      const alert = getByRole('alert')
      console.log(alert);
      
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Oops! Something went wrong.');
      expect(alert).toHaveTextContent('We couldn\'t log you in with the provided credentials. Please check your username and password and try again.');
    });
  });




});