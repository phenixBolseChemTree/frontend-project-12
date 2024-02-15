import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import FeedbackForm from './FeedbackForm';

const Feedback = () => {
  console.log(123);
  // тут будет окно для отправки мне сообщений
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body bsPrefix="row p-5">
              <Col md={6} className="mt-3 mt-md-0">
                <h1 style={{ display: 'flex', width: '300px' }} className="text-center mb-4">Форма отзыва</h1>
                <FeedbackForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>оставьте отзыв или рекомендацию по улучшению работы чата</span>
                {' '}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
