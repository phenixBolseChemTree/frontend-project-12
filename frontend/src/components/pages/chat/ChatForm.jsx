// import React, { useEffect, useRef } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useTranslation } from 'react-i18next';
// import leoFilter from 'leo-profanity';
// import { useSelector } from 'react-redux';
// import { Form } from 'react-bootstrap';
// import { useApi } from '../../ApiProvider';

// const ChatForm = () => {
//   const input = useRef(null);
//   const api = useApi();
//   const { currentChannelId } = useSelector((state) => state.chat);

//   const { t } = useTranslation();

//   useEffect(() => {
//     input.current.focus();
//   }, []);

//   const validationSchema = yup.object().shape({
//     textInputForm: yup.string().required(t('chat.formPlaceholder')),
//   });

//   const formik = useFormik({
//     initialValues: {
//       textInputForm: '',
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       leoFilter.add(leoFilter.getDictionary('ru'), leoFilter.getDictionary('en'), leoFilter.getDictionary('fr'));
//       const validatedText = leoFilter.clean(values.textInputForm);

//       api.newMessage({
//         body: validatedText,
//         username: localStorage.username,
//         channelId: currentChannelId,
//       });

//       setSubmitting(false);

//       resetForm();
//     },
//   });
//   return (
//     <div className="mt-auto px-5 py-3">
//       <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
//         <Form.Group className="input-group has-validation">
//           <Form.Control
//             type="text"
//             name="textInputForm"
//             aria-label={t('chat.newMessage')}
//             className="border-0 p-0 ps-2 form-control"
//             value={formik.values.textInputForm}
//             placeholder={t('chat.formPlaceholder')}
//             onChange={formik.handleChange}
//             ref={input}
//           />
//           <button
//             type="submit"
//             className="btn btn-group-vertical"
//             disabled={formik.isSubmitting}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
//             </svg>
//             <span className="visually-hidden">{t('chat.send')}</span>
//           </button>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

// export default ChatForm;
