import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal,Button, Card, Container, Row, Col, Form } from "react-bootstrap";

import {
  
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  
} from "mdb-react-ui-kit";
export default function CourseEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update course: ${errorText}`);
      }

      const newData = await response.json();
      setData(newData);
      console.log("Course updated successfully.");
      navigate("/manage-courses"); 
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


return (

<Container ><h2 class = "mt-4"> Edit Course</h2>
  <MDBContainer fluid className="w-50">
   
        <MDBCard className="my-5">
          <MDBCardBody className="p-5">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <label>Name</label>
              <MDBInput
                wrapperClass="mb-4"
                input
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData({ ...data, ["name"]: e.target.value })
                }
              />
             
      <Button variant="primary" type="submit"> Save Changes</Button>

            </form>
          </MDBCardBody>
        </MDBCard>

  </MDBContainer>
</Container>
  );
}
