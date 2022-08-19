import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation';
import { Button, Container, Form } from 'react-bootstrap'
import { RegisterData } from '../models/RegisterInterface'

const Register: React.FC = () => {

  const [cred, setCred] = useState<RegisterData>({
    username: '',
    email: '',
    password: ''
  });

  const [pwd, setPwd] = useState<string>('');

  const handleChange = (e: React.FormEvent): void => {
    const name: string = (e.target as HTMLInputElement).name;
    const value: string = (e.target as HTMLInputElement).value;

    if (name === 'pwd')
      return setPwd(value);

    setCred((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    if (cred.username === '' || cred.password === "" || cred.email === '')
      return alert('All fields required!')

    if (cred.password !== pwd) {
      return alert('Passwords didn\'t match')
    }

    try {
      const res: Response = await fetch(`http://localhost:5500/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred)
      });

      const result = await res.json();

      if (res.status !== 200) {
        alert(result.message);
      } else {
        alert(result.message + ' ' + result.username);
        setCred(
          {
            username: '',
            email: '',
            password: ''
          }
        );
        setPwd('');
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
          <h3 className='text-center'>Registration</h3>
          <hr />
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name='username' value={cred.username} onChange={handleChange} placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' value={cred.email} onChange={handleChange} placeholder="Enter Email" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' value={cred.password} onChange={handleChange} placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name='pwd' value={pwd} onChange={handleChange} placeholder="Confirm Password" />
          </Form.Group>

          <p className='mb-3 text-end'>
            <Link to='/login' className='hov'>
              Already have an account?
            </Link>
          </p>

          <Form.Group className='mb-3 text-center'>
            <Button variant="primary" type="submit" size='sm' className='w-75' onClick={handleSubmit}>
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default Register;