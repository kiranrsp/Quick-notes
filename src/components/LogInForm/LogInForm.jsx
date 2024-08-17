// LoginForm.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../SignUpForm/SignUpForm';
import * as usersService from '../../utilities/users-service';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';


export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {

    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {

      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/home')
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    
      <div>
<Container>
  <Row className="justify-content-md-center">

    <Col xs={25}>
     <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Welcome back <br />
            <span className="text-primary">Lets continue your journey with Notes App</span>
          </h1>




        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <form autoComplete="off" onSubmit={handleSubmit}>


                  <label>Email</label>
                <MDBInput wrapperClass='mb-4' input type="text" name="email" value={credentials.email} onChange={handleChange} required />
                  <label>Password</label>
                <MDBInput wrapperClass='mb-4' tinput type="password" name="password" value={credentials.password} onChange={handleChange} required />
                  

                <Button variant="primary" type="submit"> Login</Button>
              </form>




            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

     </MDBContainer>
    </Col>
  </Row>

</Container>

</div>
      
  );
}
