import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../routes';
import useAuth from '../hooks/useAuth';
import img from '../images/avatar.jpg';

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigation = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax')),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(6, t('errors.password')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('errors.confirmPassword')),
  });

  const onSubmit = async (values) => {
    setAuthFailed(false);

    try {
      const res = await axios.post(routes.signupPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
    } catch (err) {
      if (err.isAxiosError && err.response.data.statusCode === 409) {
        setAuthFailed(true);
        inputRef.current.select();

        return;
      }
      inputRef.current.select();
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    if (auth.loggedIn) {
      navigation('/');
    }
  }, [auth.loggedIn, navigation]);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} className="fluid rounded-circle w-100 h-auto" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form
                    className="w-50"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-center mb-4">
                      {t('titles.registration')}
                    </h1>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Имя пользователя"
                        value={values.username}
                        onChange={(e) => {
                          handleChange(e);
                          if (inputRef.current.value === '') {
                            setAuthFailed(false);
                          }
                        }}
                        onBlur={handleBlur}
                        ref={inputRef}
                        isInvalid={(touched.username && errors.username) || authFailed === true}
                        required
                      />
                      <Form.Label htmlFor="username">{t('fields.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(touched.password && errors.password) || authFailed === true}
                        required
                      />
                      <Form.Label htmlFor="password">
                        {t('fields.password')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Подтвердите пароль"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={(
                          touched.confirmPassword && errors.confirmPassword) || authFailed === true}
                        required
                      />
                      {authFailed
                        ? (
                          <div className="invalid-tooltip">
                            {t('errors.nameExist')}
                          </div>
                        )
                        : null}
                      <Form.Label htmlFor="confirmPassword">{t('fields.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className="w-100">
                      {t('buttons.signup')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
