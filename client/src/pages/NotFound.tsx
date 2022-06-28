import React from 'react'
import Error_404 from '../assests/gifs/404.gif'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }} xs={12}>
            <Image
              src={Error_404}
              alt='Page not Found! Error 404'
              className='mt-5 mt-md-3'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={{ span: 7, offset: 3 }} className='d-flex justify-content-around mt-5 mt-md-3'>
            <Button variant='outline-secondary' className='btn-sm px-5' onClick={() => navigate(-1)}>Back</Button>
            <Button variant='outline-dark' className='btn-sm px-3' onClick={() => navigate('/')}>Homepage</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotFound;