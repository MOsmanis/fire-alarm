import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

export interface NewMessage {
  isFireDepartmentCalled: boolean,
  apartment: number,
  comment: string,
} 

function App() {
  const maxApartment = 54;
  const [submitStatus, setSubmitStatus] = useState("")
  const [submitStatusType, setSubmitStatusType] = useState("success")
  const [message, setMessage] = useState<NewMessage>({isFireDepartmentCalled: false, apartment: 1, comment: ""})
  const [loading, setLoading] = useState(false)

  const handleApartmentBlur = (e: any) => {
    if(e.currentTarget.value>maxApartment) {
      e.currentTarget.value = maxApartment
    }
    if(e.currentTarget.value<1) {
      e.currentTarget.value = 1
    }
    setMessage({...message, apartment:e.currentTarget.value})
  }

  const validateMessage = (): boolean => {
    if(message.apartment<1 || message.apartment > 54) {
      setSubmitStatusType("danger")
      setSubmitStatus("Provide an apartment number")
      return false;
    }
    if(!message.comment) {
      setSubmitStatusType("danger")
      setSubmitStatus("Provide a comment")
      return false;
    }
    return true;
  }

  const onSubmitMessage = (event: any) => {
    setSubmitStatus("");
    event.preventDefault();
    if(validateMessage()) {
      setLoading(true)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      };
      fetch('http://localhost:8080/submit', requestOptions)
      .then(response => {
        setLoading(false)
        if(response.ok) {
          setSubmitStatusType("success");
          setSubmitStatus("Message sent!");
          event.target.reset();
          message.isFireDepartmentCalled=false;
        } else {
          setSubmitStatusType("danger");
          setSubmitStatus("Server error");
        }
      });
    }
  }

  return (
    <Container fluid id="board">
      <Row>
        <Col>
          <h1>Dear short-term tenants</h1>
          <p>
          In case of a fire, call <b>112</b>, evacuate the building calmly, and contact your renter.<br/>
          <a href="https://latvija.lv/en/DzivesSituacijas/tiesibu-aizsardziba/Personas_drosiba#show2">More about the emergency services in Latvia</a>
          </p>
          <p>
          Apartments on the 1st and 2nd floors have very sensitive smoke detectors that can trigger an alarm for the whole building even from a humidifier. Even so, safety is the top priority.
          </p>
          <p>
          If you are certain that it is only a false alarm, please send a message below. There are homeowners who are often present and would like to help, some owners can check where the alarm originated. 
          </p>
          <p>
          The alarm has lasted for multiple hours before, so it is also in the interest of residents to better understand the situation.
          </p>
        </Col>
      </Row>
      <Row >
          <Form onSubmit={e => onSubmitMessage(e)}>
          <Form.Group>
              <Form.Text>
                I have called 112 and the firefighters are on their way 
              </Form.Text>
              <br/>
              <Form.Check
                inline
                label="Yes"
                type="radio"
                id={`inline-radio-1`}
                checked={message.isFireDepartmentCalled===true}
                onChange={() =>setMessage({...message, isFireDepartmentCalled:true})}
              />
              <Form.Check
                inline
                label="No"
                type="radio"
                id={`inline-radio-2`}
                checked={message.isFireDepartmentCalled===false}
                onChange={() =>setMessage({...message, isFireDepartmentCalled:false})}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apartment number</Form.Label>
            <Form.Control required type="number" defaultValue={1} min={1} max={maxApartment} onBlur={e => handleApartmentBlur(e)}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label >Comment</Form.Label>
            <Form.Control as="textarea" placeholder="...I burned my breakfast :(" onBlur={e => setMessage({...message, comment:e.currentTarget.value})}/>
          </Form.Group>
          <Alert hidden={!submitStatus} key={submitStatusType} variant={submitStatusType}>
            {submitStatus}
          </Alert>
          <Button variant="primary" type="submit">
              <Spinner 
              hidden={!loading}
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <div hidden={loading}>Submit</div>
          </Button>
          <Alert key="warning" variant="warning" >
            This web page is only informational and does not represent any official authorities. It was made by one of the residents as a way to inform foreigners and provide a way to reach out to the local community
          </Alert>
        </Form>
        </Row>
  </Container>
  )
}

export default App
