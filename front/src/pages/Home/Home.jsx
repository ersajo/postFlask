import React, { useState, useEffect } from 'react'
import { post } from '../../utils/http.js'
import {
  Container, Row, Col, Card, Badge
} from 'react-bootstrap'
import SimpleDateTime from 'react-simple-timestamp-to-date';
import './Home.css'

const Home = () => {
  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    const response = await post.allPosts()
    setPosts(response.data)
  }

  useEffect(() => {
    fetchData();
  }, [setPosts])

  return (
    <div>
      <Container>
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
                      <SimpleDateTime dateSeparator="/" timeSeparator=":" format="YMD">{post.created_at}</SimpleDateTime>
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

export default Home