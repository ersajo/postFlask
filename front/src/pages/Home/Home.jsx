import React from 'react'
import {
  Container, 
  Row,
  Col
} from 'react-bootstrap'
import './Home.css'

const Home = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="post-container">Debes iniciar sesión</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home