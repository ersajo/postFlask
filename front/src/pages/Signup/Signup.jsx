import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { Redirect } from 'react-router-dom'
import { auth } from '../../utils/http.js'
import {
  Form,
  Button,
  FormGroup,
  Container,
  Row,
  Col
} from 'react-bootstrap'

const Signup = () => {
  const { isAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  
  const handleForm = async (e) => {
    try {
      e.preventDefault()
      const body = {
        email,
        password
      }
      await auth.signup(body)
      setRedirect(true)
    } catch (error) {
      console.log(error)
      console.error(error.message)
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleForm}>
              <FormGroup>
                <label> Email </label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Ingresa un email"
                />
              </FormGroup>
              <FormGroup>
                <label> Password </label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      { redirect || isAuth ? <Redirect to="/login" /> : null}
    </React.Fragment>
  )
}

export default Signup
