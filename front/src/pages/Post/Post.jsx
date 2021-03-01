import decode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import { post } from '../../utils/http.js'
import {
  Container, Row, Col, Card, Badge,
  Button, Modal, Form, FormGroup
} from 'react-bootstrap'
import './Post.css'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleForm = async (e) => {
    try {
      e.preventDefault()
      const user = decode(localStorage.getItem('auth-token')).id
      const body = { title, content, tags, user }
      await post.createPost(body)
      handleClose()
      fetchData()
    } catch (error) {
      console.error(error.message)
      handleClose()
    }
  }
  
  const toogle = (e) => {
    let newTags = tags;
    if (e.target.checked){
      newTags.push(e.target.value)
    } else {
      const index = newTags.indexOf(e.target.value);
      newTags.splice(index, 1);
    }
    setTags(newTags);
  }
  
  const fetchData = async () => {
    const localToken = decode(localStorage.getItem('auth-token'))
    const response = await post.getPostsByUser(localToken.id)
    setPosts(response.data)
  }
  
  useEffect(() => {
    fetchData();
  }, [setPosts])
  
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleForm}>
          <Modal.Body>
              <FormGroup>
                <Form.Label> Titulo </Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ingresar un titulo"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label> Contenido </Form.Label>
                <Form.Control
                  type="text"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Contenido"
                />
              </FormGroup>
              <Form.Group>
                <Form.Label>Selecciona tus tags</Form.Label>
                <Form.Check type='checkbox' value="Bienvenida" label='Bienvenida' onChange={e => toogle(e)}/>
                <Form.Check type='checkbox' value="Saludos" label='Saludos' onChange={e => toogle(e)}/>
                <Form.Check type='checkbox' value="Tecnología" label='Tecnología' onChange={e => toogle(e)}/>
                <Form.Check type='checkbox' value="Deportes" label='Deportes' onChange={e => toogle(e)}/>
                <Form.Check type='checkbox' value="Finanzas" label='Finanzas' onChange={e => toogle(e)}/>
                <Form.Check type='checkbox' value="Amor" label='Amor' onChange={e => toogle(e)}/>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Container>
        <Row style={{ margin: '5px' }}>
          <Button variant="primary" onClick={handleShow}>
            Crear nuevo post
          </Button>
        </Row>
        <Row>
          {
            posts.map((post, index) => {
              return (
                <Col md='4' key={index} style={{ marginBottom: '5px', marginTop: '5px' }}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      {
                        post.tags.map((tag, index) => {
                          return (
                            <Badge variant="secondary" style={{ marginLeft: '5px' }} key={index}>{tag}</Badge>
                          )
                        })
                      }
                      <Card.Text>{post.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default Post