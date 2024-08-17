import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


//import "./SignUpForm.css";

import Container from "react-bootstrap/Container";

import * as Components from "../../pages/AuthPage/Components";
import Button from "react-bootstrap/Button";
import React from "react";
import {
  
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  
} from "mdb-react-ui-kit";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  // The object passed to setState is merged with the current state object
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.confirm;
      delete formData.error;

      const user = await signUp(formData);

      this.props.setUser(user);
      this.props.navigation.navigate('/home')
      
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <div>
          <Container>
            <MDBContainer fluid className="p-4">
              <MDBRow>
                <MDBCol
                  md="6"
                  className="text-center text-md-start d-flex flex-column justify-content-center"
                >
                  <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                    Take first step to <br />
                    <span className="text-primary">
                      organise your Notes with  "Notes App" 
                    </span>
                  </h1>

                  <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
                    
                  </p>

                </MDBCol>

                <MDBCol md="6">
                  <MDBCard className="my-5">
                    <MDBCardBody className="p-5">
                      <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <MDBInput
                          wrapperClass="mb-4"
                          input
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required
                        />
                        <label>Email</label>
                        <MDBInput
                          wrapperClass="mb-4"
                          type="email"
                          input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          required
                        />
                        <label>Password</label>
                        <MDBInput
                          wrapperClass="mb-4"
                          type="password"
                          input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                        <label>Confirm</label>
                        <MDBInput
                          wrapperClass="mb-4"
                          type="password"
                          input
                          type="password"
                          name="confirm"
                          value={this.state.confirm}
                          onChange={this.handleChange}
                          required
                        />
                <Button variant="primary" disabled={disable} type="submit"> Signup</Button>

                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </Container>
        </div>
      </>
    );
  }
}
