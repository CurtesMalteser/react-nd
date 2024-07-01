import { render, waitFor, fireEvent, } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './Login';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('LoginPage', () => {

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

  });

  it('renders alert wrong credentials if password is incorrect', async () => {
    const { getByRole, getByPlaceholderText, getAllByRole } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const dropdown = getByRole('combobox');
    const passwordInput = getByPlaceholderText('Random password');
    const buttonLogin = getByRole('button', { name: 'Login' });
    const buttonCancel = getByRole('button', { name: 'Cancel' });

    expect(buttonCancel).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    await userEvent.selectOptions(dropdown, 'johndoe');

    await userEvent.type(passwordInput, 'incorrectPassword');

    await userEvent.click(buttonLogin);


    await waitFor(() => {
      const alert = getByRole('alert')
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Oops! Something went wrong.');
      expect(alert).toHaveTextContent('We couldn\'t log you in with the provided credentials. Please check your username and password and try again.');
    });
  });

  it('renders neither a valid nor an invalid password message when the user did not start typing', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const passwordInput = getByPlaceholderText('Random password');

    await waitFor(() => {
      expect(passwordInput).not.toHaveClass('is-valid' || 'is-invalid');
    });
  });

  it('renders invalid password message', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const passwordInput = getByPlaceholderText('Random password');

    fireEvent.change(passwordInput, { target: { value: 's' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    await waitFor(() => {
      expect(passwordInput).toHaveClass('is-invalid');
    });

  });

  it('renders valid password message', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const passwordInput = getByPlaceholderText('Random password');

    fireEvent.change(passwordInput, { target: { value: 'valid' } });
    fireEvent.change(passwordInput, { target: { value: 'valid-password' } });

    await waitFor(() => {
      expect(passwordInput).toHaveClass('is-valid');
    });
  });

  it('renders neither a valid nor an invalid user message when no user was previously selected', async () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const dropdown = getByRole('combobox');

    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    await waitFor(() => {
      expect(dropdown).not.toHaveClass('is-valid' || 'is-invalid');
    });

  });

  it('renders valid user message', async () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const dropdown = getByRole('combobox');

    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    await userEvent.selectOptions(dropdown, 'johndoe');

    await waitFor(() => {
      expect(dropdown).toHaveClass('is-valid');
    });

  });

  it('renders invalid user message', async () => {
    const { getByRole, getAllByRole } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const dropdown = getByRole('combobox');

    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(5);
    });

    await userEvent.selectOptions(dropdown, 'johndoe');
    await userEvent.selectOptions(dropdown, '');

    await waitFor(() => {
      expect(dropdown).toHaveClass('is-invalid');
    });

  });

});