import decode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import { post } from '../../utils/http.js'
import {
  Container,
  Row,
  Col,
  Card,
  Badge
} from 'react-bootstrap'
import './Post.css'

const Post = () => {
  const [posts, setPosts] = useState([])
  
  const fetchData = async () => {
    const localToken = decode(localStorage.getItem('auth-token'))
    const response = await post.getPost(localToken.id)
    setPosts(response.data)
  }
  
  useEffect(() => {
    fetchData();
  }, [setPosts])
  
  return (
    <div>
      <Container>
        <Row>
          <Col className="post-container">Post</Col>
        </Row>
        <Row>
          {
            posts.map((post, index) => {
              return (
                <Col md='4'>
                  <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      {
                        post.tags.map((tag) => {
                          return (
                            <Badge variant="secondary" style={{ marginLeft: '5px' }}>tag</Badge>
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