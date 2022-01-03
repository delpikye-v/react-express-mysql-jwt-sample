// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import React, { useState } from 'react'

// import * as Yup from 'yup'
// import renderError from '../error/label.error';

// const validationSchema = Yup.object({
//     email: Yup.string()
//         .required('This is require.')
//         .email('Format invalid.')
//         .max(50, 'Minimum length is 50.')
// });

// const UserModifyComponent = ({ item, handlerDelete }) => {
//     const [isModify, setModify] = useState(false)
//     const initialValues = {
//         // user_name: item.user_name,
//         email: item.email
//     }
//     return (
//         <>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={async (values, { resetForm }) => {
//                     debugger
//                 }}
//             >
//                 <Form>
//                     <td>{item.user_name}</td>
//                     <td>
//                         {
//                             isModify ? (
//                             <>
//                                 <Field
//                                     name="email"
//                                     type="text"
//                                     className="form-control"
//                                     maxLength='50'
//                                     autoComplete="off"
//                                 />
//                                 <ErrorMessage
//                                     name="email"
//                                     render={renderError}
//                                 />
//                                 </>
//                             ) : (item.email)
//                         }
//                     </td>
//                     <td><button onClick={() => setModify(true)}>Edit</button></td>

//                     <td>
//                         {
//                             (item.is_admin !== 1) &&
//                             <button onClick={() => handlerDelete(item.user_id, item.user_name)}>Delete</button>
//                         }
//                     </td>
//                 </Form>
//             </Formik>
//         </>
//     )
// }

// export default UserModifyComponent
