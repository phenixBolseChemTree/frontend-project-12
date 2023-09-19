import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function RegistrationForm() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={img}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Имя пользователя</label>
            <Field type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <Field type="text" id="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="passwordRes" className="form-label">Повторите пароль</label>
            <Field type="passwordRes" id="passwordRes" name="passwordRes" className="form-control" />
            <ErrorMessage name="passwordRes" component="div" className="text-danger" />
          </div>

          { show &&
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Ошибка!</Alert.Heading>
            <p>
              Такой пользователь уже существует
            </p>
          </Alert>
          }
          <button type="submit" className="btn btn-primary">Отправить</button>
        </Form>
      </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
