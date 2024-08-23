import React, { useState } from "react";
import { createUser } from "../../../api/backend/UserAction";
import toast, { Toaster } from "react-hot-toast";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PasswordField from "../../Fields/PasswordField";
import * as UserYup from '../../../services/formik/yup/AccountUserYup';
import { userInitialValues } from "../../../services/formik/initialValues/UserInitialValues";
import TextErrors from "../../Fields/TextErrors";
import AddressField from "../../Fields/AddressField";


const Register = () => {
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={userInitialValues}
      validationSchema={UserYup.schemaRegisterForm}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control" id="infoPersonnel">
              <span>
                <label htmlFor="name"> Nom : </label>
                <Field type="text" name="name" placeholder="Jone" />
                <ErrorMessage name="name" component={TextErrors} />
                <label htmlFor="lastName"> Prénom : </label>
                <Field type="text" name="lastName" placeholder="Doe" />
                <ErrorMessage name="lastName" component={TextErrors} />
                <label htmlFor="birthday">Date de Naissance</label>
                <Field type="date" name="birthday" />
                <ErrorMessage name="birthday" component={TextErrors} />
              </span>

              <span>
                <label htmlFor="phone"> Téléphone: </label>
                <Field type="tel" name="phone" />
                <ErrorMessage name="phone" component={TextErrors} />
                <Field type="text" label="Addresse :" name="address"  placeholder="Paris" component={AddressField} />
              </span>
            </div>
            <div className="form-control" id="passwordField">
              <label htmlFor="email"> E-mail: </label>
              <Field type="email" name="email" placeholder="E-mail" />
              <ErrorMessage name="email" component={TextErrors} />
              <Field
                name="password"
                label="Mot de Passe : "
                placeholder="Entrez votre mot de passe"
                component={PasswordField}
              />
              <Field
                name="confirmPassword"
                label="Confirmer votre Mot de Passe : "
                placeholder="Confirmez votre mot de passe"
                component={PasswordField}
              />
            </div>

            <div className="form-control" id="photo-profile">
              <label htmlFor="photo"> Photo de Profil : </label>
              <Field type="file" name="photo" />
              <ErrorMessage name="photo" component={TextErrors} />
            </div>

            <button type="submit">Soumettre</button>
          </Form>
        );
      }}
    </Formik>
  );
};

// const Register = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const [lastname, setLastname] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [photo, setPhoto] = useState(null);
//     const [birthday, setBirthday] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append("email", email);
//             formData.append("password", password);
//             formData.append("name", name);
//             formData.append("lastName", lastname);
//             formData.append("telephone", phone);
//             formData.append("adress", address);
//             formData.append("birthday", birthday);
//             if (photo) {
//                 formData.append("photo_profile", photo);
//                 console.log(photo);
//             }else {
//                 formData.append("photo_profile", null);
//                 console.log('nulle');
//             }

//             console.log(formData.values);
//             const response = await register(formData);
//             console.log(response);
//             setMessage("User registered successfully");
//             setError("");
//         } catch (err) {
//             setError(err.response?.data?.message || "Registration failed");
//             console.log(err)
//             setMessage("");
//         }
//     };

//     return (
//       <form onSubmit={handleSubmit}>

//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Nom:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Prénom:
//           <input
//             type="text"
//             value={lastname}
//             onChange={(e) => setLastname(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Téléphone:
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Date de Naissance:
//           <input
//             type="date"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Adresse:
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Ajouter photo de profile:
//           <input
//             type="file"
//             onChange={(e) => setPhoto(e.target.files[0])}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Register</button>
//         {message && <p>{message}</p>}
//         {error && <p>{error}</p>}
//       </form>
//     );
// };

export default Register;
