import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


import { Modal,Button, Card, Container, Row, Col, Form } from "react-bootstrap";

export default function CoursePage({ user }) {
  const [course, setCourse] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const add = async (e) => {
    e.preventDefault();

    if (course.name.trim() === "") {
      setError("Course Name cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: course.name,
          cost: course.cost,
          days: course.days,
          rating: course.rating,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      else {
        handleClose()
      }

      const newCourse = await response.json();

      if (!newCourse.createdAt) {
        newCourse.createdAt = new Date().toISOString();
      }

      setCourses((prevCourses) => [...prevCourses, newCourse]);
      setCourse({});
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const token = localStorage.getItem("token");
    // console.log(id);
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedCourses = [...Courses].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
     

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>                <Form onSubmit={add}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      onChange={(e) =>
                        setCourse({ ...course, ["name"]: e.target.value })
                      }
                    />
        
                    
                  </Form.Group>

                  {error && <p style={{ color: "red" }}>{error}</p>}
                </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={add} disabled={loading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      <br></br>
      {sortedCourses.length > 0 ? (
        <>
 
          <Container ><h2 class = "mt-4"> List of your notes</h2>
  
            <Row className="justify-content-md-center">
              <Col xs={10}>
                {" "}
                <div class="card bg-light ms-4 me-4 mb-4">
                  <div class="card-header d-flex justify-content-between"><span></span><span><Button variant="primary" onClick={handleShow} >
                    Add Notes
                  </Button></span></div>
                  <div class="card-body">
                    <p class="card-text">
                      <div class="table-responsive ">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Course Name</th>
                              <th scope="col">Course Cost</th>


                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedCourses.map((c) => (
                              <tr key={c._id}>
                                <td>{c.name} </td>
                                <td> {new Date(c.createdAt).toLocaleString()}</td>


                                <td>
                                  <Link to={`/course/${c._id}`}>
                                    <Button variant="primary">Edit</Button>
                                  </Link>
                                </td>

                                <td>
                                  <a
                                    class="btn btn-danger"
                                    onClick={() => deleteCourse(c._id)}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>


        </>
      ) : (
        <><p>No Notes to display yet</p>
        <Button variant="primary" onClick={handleShow} >
                    Add Notes
                  </Button>
                  </>
      )}
    </div>
  );
}
