import React, { useState, useEffect } from 'react'
import { Link, useNavigate, NavigateFunction } from 'react-router-dom'
import { Button, Container, Form } from 'react-bootstrap';
import Navigation from './Navigation';
import { Identity } from '../models/LoginInterace'

const Login: React.FC = () => {

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accesstoken') !== null) {
      navigate('/chat-screen')
    }
  }, []);

  const [cred, setCred] = useState<Identity>({
    username: '',
    password: ""
  });

  const handleChange = (e: React.FormEvent): void => {
    const name: string = (e.target as HTMLInputElement).name;
    const value: string = (e.target as HTMLInputElement).value;

    setCred((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    try {
      if (cred.username === '' || cred.password === "")
        return alert('All fields required!')

      const res: Response = await fetch(`http://localhost:5500/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred)
      });

      const result = await res.json();

      if (res.status !== 200) {
        alert(result.message);
      } else {
        localStorage.setItem('accesstoken', result.access_token);
        navigate('/chat-screen');
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <Form className='main-container mx-auto'>
          <h2 className='text-center'>Login</h2>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='username' value={cred.username} onChange={handleChange} placeholder="Enter Username / Email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' value={cred.password} onChange={handleChange} placeholder="Password" />
          </Form.Group>

          <p className='mb-3 text-end'>
            <Link to='/register' className='hov'>Don't have an Account?</Link>
          </p>

          <Form.Group className='mb-3 text-center'>
            <Button variant="primary" type="submit" size='sm' className='w-75' onClick={handleSubmit}>
              Sign In
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default Login;