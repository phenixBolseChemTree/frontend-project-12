import {
  Container, Row, Col, Card,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import img from '../../../assets/happy_man.jpg';
import SignupForm from './SignupForm';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={img}
                  className="rounded-circle"
                  alt={t('signup.registration')}
                />
              </div>
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
