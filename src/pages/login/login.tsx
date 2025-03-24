import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import {
  clearErrorText,
  fetchLogin,
  selectErrorText,
  selectLoading
} from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const erorr = useSelector(selectErrorText);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(clearErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearErrorText());
    dispatch(fetchLogin(values))
      .unwrap()
      .then((payload) => {
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={erorr}
      email={values.email}
      setEmail={handleChange}
      password={values.password}
      setPassword={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
