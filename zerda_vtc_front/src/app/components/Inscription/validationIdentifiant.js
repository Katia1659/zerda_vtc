import {
  React,
  Formik,
  Form,
  Field,
  ErrorMessage,
  schemaIdentificationField,
  TextErrors,
  PasswordField,
  toast,
  Toaster,
} from "./index";
import "./assets/style.css";

const ValidationIdenrifiant = ({ formData, saveFormData, nextStep }) => {

  const handleSubmit = (values) => {
    saveFormData (values);
    nextStep();
    toast("vous etes presque ", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "🔥",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={schemaIdentificationField}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
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
            <button type="submit">suivant</button>
            <Toaster />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ValidationIdenrifiant;


