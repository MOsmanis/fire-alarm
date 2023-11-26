import Container from "react-bootstrap/Container"
import Toast from "react-bootstrap/Toast"
import { useEffect, useState } from "react"


export interface Message {
    id: number,
    fireDepartmentCalled: boolean,
    apartment: number,
    comment: string,
    sentAt: string,
  }

const Messages = () => {
    const [messages, setMessages] = useState([])
    const getMessages = async () => {
      fetch("http://localhost:8080/messages")
      .then(res => res.json())
      .then(
          (result) => {                    
            setMessages(result)
          },
          (error) => {
            console.log(error)
            setMessages([])
          }
      )
    }
    useEffect(() => {
        getMessages();
    })

    return(
        <Container fluid id="messages">
            {messages.map((msg: Message) => { return(
                <Toast key={msg.id}>
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">{"Apartment " + msg.apartment + ", " + (msg.fireDepartmentCalled ? "called 112" : "did not call 112")}</strong>
                    <small>{msg.sentAt}</small>
                </Toast.Header>
                <Toast.Body>{msg.comment}</Toast.Body>
                </Toast>)
            })}
        </Container>
  )
}

export default Messages