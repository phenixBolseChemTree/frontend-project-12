/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = 'service_0itu81v';
    const templateID = 'template_p02gtz7';

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: 'TziDoYsLZJCNVQy4P',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast('Спасибо за отзыв!', { type: 'success' });
          form.current.reset();
        },
        () => {
          toast('Упс похоже произошла ошибка', { type: 'error' });
        },
      );
  };
  return (
    <Form ref={form} onSubmit={sendEmail}>
      <Form.Floating className="mb-3">
        <Form.Control
          required
          type="email"
          name="email"
          id="email"
          style={{ width: '300px' }}
        />
        <Form.Label htmlFor="name">Ваша почта...</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-5">
        <Form.Control
          required
          type="text"
          name="message"
          id="message"
          as="textarea"
          style={{ height: '200px', width: '550px' }}
        />
        <Form.Label htmlFor="password">Ваше сообщение...</Form.Label>
      </Form.Floating>
      <Button value="Send" type="submit">Отправка</Button>
    </Form>
  );
};

export default FeedbackForm;
