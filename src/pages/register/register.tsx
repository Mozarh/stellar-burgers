import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import {
  clearErrorText,
  fetchGetUser,
  fetchRegisterUser,
  selectErrorText,
  selectLoading
} from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const isLoading = useSelector(selectLoading);
  const erorr = useSelector(selectErrorText);

  useEffect(() => {
    dispatch(clearErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    )
      .unwrap()
      .then((payLoad) => {
        localStorage.setItem('refreshToken', payLoad.refreshToken);
        setCookie('accessToken', payLoad.accessToken);
        dispatch(fetchGetUser());
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={erorr}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
