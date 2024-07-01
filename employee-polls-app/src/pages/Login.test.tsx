import { render, waitFor, fireEvent, cleanup, } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './Login';
import { Provider } from 'react-redux';
import { AnyAction, Store, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authedUserReducer from '../features/authedUser/authedUserSlice';
import questionsReducer from '../features/questions/questionsSlice';
import answerQuestionReducer from '../features/questions/answerQuestionSlice';
import newPollQuestionSlice from '../features/questions/newPollQuestionSlice';

describe('LoginPage', () => {

  let _store: Store<unknown, AnyAction> | null;
  let store = () => {
    if (_store === null) {
      throw new Error("Store has not been initialized");
    }
    return _store;
  };

  beforeEach(() => {
    _store = configureStore({
      reducer: {
        counter: counterReducer,
        users: usersReducer,
        authedUser: authedUserReducer,
        questionsState: questionsReducer,
        answerState: answerQuestionReducer,
        newPollState: newPollQuestionSlice,
      },
    });
  });

  afterEach(() => {
    // Perform any cleanup actions after each test, if necessary
    _store = null;
    cleanup();
  });


  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Provider store={store()}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

  });

  it('renders alert wrong credentials if password is incorrect', async () => {
    const { getByRole, getByPlaceholderText, getAllByRole } = render(
      <Provider store={store()}>
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

  it('alert does not render if the user is not selected, proving it is not possible to submit the form without selecting a user', async () => {
    const { getByRole, getByPlaceholderText, getAllByRole, queryByRole } = render(
      <Provider store={store()}>
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

    await userEvent.type(passwordInput, 'short');

    await userEvent.click(buttonLogin);

    await waitFor(() => {
      const alert = queryByRole('alert')
      expect(alert).not.toBeInTheDocument();
    });
  });

  it('alert does not render if the password is not valid, proving it is not possible to submit the form without selecting inserting a password minimun six chars', async () => {
    const { getByRole, getByPlaceholderText, queryByRole } = render(
      <Provider store={store()}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );


    const passwordInput = getByPlaceholderText('Random password');
    const buttonLogin = getByRole('button', { name: 'Login' });
    const buttonCancel = getByRole('button', { name: 'Cancel' });

    expect(buttonCancel).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await userEvent.type(passwordInput, 'incorrectPassword');

    await userEvent.click(buttonLogin);


    await waitFor(() => {
      const alert = queryByRole('alert')
      expect(alert).not.toBeInTheDocument();
    });
  });


  it('renders neither a valid nor an invalid password message when the user did not start typing', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store()}>
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
      <Provider store={store()}>
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
      <Provider store={store()}>
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
      <Provider store={store()}>
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
      <Provider store={store()}>
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
      <Provider store={store()}>
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