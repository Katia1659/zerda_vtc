import {
  React,
  Formik,
  Form,
  Field,
  ErrorMessage,
  schemaPersonelField,
  TextErrors,
  toast,
  Toaster,
  AddressField,
} from "./index";
import "./assets/style.css";

const ValidatioPersonal = ({ formData, saveFormData, nextStep, prevStep }) => {
  const handleSubmit = (values) => {
    saveFormData(values);
    nextStep();
    toast("plus q'une étape", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "👏",

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
      validationSchema={schemaPersonelField}
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
                <Field
                  type="text"
                  label="Addresse :"
                  name="address"
                  placeholder="Paris"
                  component={AddressField}
                />
              </span>
            </div>
            <button type="submit">suivant</button>
            <button
              type="button"
              onClick={() => {
                prevStep();
              }}
            >
              Routour
            </button>
            <Toaster />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ValidatioPersonal;
