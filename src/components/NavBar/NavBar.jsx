import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faHouseChimneyWindow } from "@fortawesome/free-solid-svg-icons";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";




export default function NavBar({user, setUser}) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>

    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="justify-content-left">  &nbsp;Welcome to Notes App</Navbar.Brand>
          <Nav className="me-auto">
          &nbsp;  &nbsp;

            <Nav.Link href="/manage-courses"><a><FontAwesomeIcon icon={faToolbox} />
</a>&nbsp;Manage Notes</Nav.Link>


          </Nav>

          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text ><a><FontAwesomeIcon icon={faUser} />
</a>
&nbsp;Welcome <a > {user.name}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Nav>&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;
        <Nav.Link className="nav-link" onClick={handleLogOut}><a><FontAwesomeIcon icon={faRightFromBracket} />
</a>&nbsp;Log Out</Nav.Link>
        </Nav>

        </Container>
      </Navbar>

    </>
  );

}

