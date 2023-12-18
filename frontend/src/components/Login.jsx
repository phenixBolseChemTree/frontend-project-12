import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import img from '../assets/red_flag.jpeg';
import LoginForm from './LoginForm';
import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body bsPrefix="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <img
                  src={img}
                  className="rounded-circle"
                  alt={t('login.come')}
                />
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('login.come')}</h1>
                <LoginForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to={routes.signup}>{t('login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
