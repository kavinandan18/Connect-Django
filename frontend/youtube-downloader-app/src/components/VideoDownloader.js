// VideoDownloader.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, InputGroup, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './VideoDownloader.css'; // Import the styles

const VideoDownloader = ({ thumb, likes, dislikes, description, streams }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [views, setViews] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownload = () => {
    setError('');
    setMessage('');

    console.log('Video URL:', url);

    const formData = new FormData();
    formData.append('video_url', url);

    axios
      .post('http://localhost:8000/api/download/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const responseData = response.data;
        setMessage(responseData.message);
        setTitle(responseData.title);
        setDuration(responseData.duration);
        setViews(responseData.views);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An unexpected error occurred.');
        }
      });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <h5>YouTube Video Downloader</h5>
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={handleInputChange}
              />
              <Button variant="primary" onClick={handleDownload}>
                Download
              </Button>
            </InputGroup>
          </Form.Group>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {title && (
            <>
              <Row>
                <Col md={6} className="ml-auto mr-auto mt-5">
                  <h1 className="h3 text-center">{title}</h1>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="ml-auto mr-auto mt-5">
                  <img className="img-responsive" src={thumb} alt="Video Thumbnail" />
                </Col>

                <Col md={4} className="ml-auto mr-auto mt-5 pt-5">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center duration">{`Duration: ${duration}`}</li>
                    <li className="list-group-item text-center views">{`Views: ${views}`}</li>
                    <li className="list-group-item text-center likes-dislikes">{`Likes: ${likes} Dislikes: ${dislikes}`}</li>
                    <li className="list-group-item text-center">
                      <button className="btn btn-info mt-3" data-toggle="collapse" data-target="#description">
                        Description
                      </button>
                    </li>
                  </ul>
                  <div id="description" className="collapse description">
                    {description}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <table className="table mt-5">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Resolution</th>
                        <th scope="col">File Size</th>
                        <th scope="col">Extension</th>
                        <th scope="col">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {streams.map((stream, index) => (
                        <tr key={index}>
                          <td>{stream.resolution}</td>
                          <td>{stream.file_size}</td>
                          <td>{stream.extension}</td>
                          <td>
                            <a
                              href={stream.video_url}
                              style={{ textDecoration: 'none' }}
                              download={`${title}.${stream.extension}`}
                              target="_blank"
                            >
                              Download <i className="fa fa-download"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VideoDownloader;
