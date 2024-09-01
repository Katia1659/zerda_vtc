import {
  React, useState, Formik, Form, Yup, toast, StepOne, StepTow, StepThree, Button, Schema, Stepper, createUser, userInitialValues,
} from "./index";

export default function Signup() {
  const [step, setStep] = useState(1);
  const initialValues = userInitialValues;

  const formValidation = {
    ...Schema.IdentificaFields, ...Schema.PersonelFields, ...Schema.ProfileField
  }
  const validationSchema = Yup.object().shape(formValidation);

  const validateCurrentStep = async (formik) => {
    const stepFields = {
      1: ["email", "phone", "password", "confirmPassword"], // Noms des champs pour l'étape 1
      2: ["name", "lastName", "birthday", "address"], // Noms des champs pour l'étape 2
      3: ["photo"], // Noms des champs pour l'étape 3
    };

    const currentField = stepFields[step] || [];
    console.log(currentField);
    const errors = await formik.validateForm();

    console.log(stepFields[step]);

    // Vérifier si les champs de la section actuelle sont valides
    currentField.every((field) =>
      console.log(formik.touched[field], errors[field], field)
    );

    currentField.forEach((field) => {
      formik.setFieldTouched(field);
    })
    return currentField.every((field) => !errors[field]);
  };



  const handleSubmit = async (values) => {
    console.log("Form Submitted :", values);
    //Creation d'un objet FormData
    const formDataToSend = new FormData();

    // ajouter des donnée du formulaire à formFata
    for (let key in values) {
      formDataToSend.append(key, values[key]);
      console.log(values[key]);
    }
    // Logique pour envoyer les données au backend
    try {
      console.log(formDataToSend);
      // Envoi de la requête
      // const response = await createUser(formDataToSend);
      toast.promise(await createUser(formDataToSend), {
        loading: "Enregistrement ...",
        success: "Enregistrement réussi 👏 !",
        error: "Erreur d'enregistrement !",
      });
      console.log("User registered successfully");
    } catch (error) {
      console.log("Registration failed: ", error);
      toast.error("Inscription Echouer  failed:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            {console.log(formik.errors)}
            <div className="flex flex-col   items-stretch  justify-stretch w-[600px] mx-auto bg-white p-6 rounded-lg shadow-lg overflow-hidden">
              <div id="steps">
                <Stepper currentStep={step} setStep={setStep} />
                {step === 1 && <StepOne formik={formik} />}
                {step === 2 && <StepTow formik={formik} />}
                {step === 3 && <StepThree formik={formik} />}
              </div>
              <div id="btns" className="flex justify-between ">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                    }}
                  >
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={async () => {
                      const isValid = await validateCurrentStep(formik);
                      if (isValid) {
                        setStep(step + 1);
                      } else {
                        console.log(isValid);
                        toast.error("il y'a des erreures encore");
                      }
                    }}
                  >
                    Valider
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={async () => {
                      const isValid = await validateCurrentStep(formik);
                      if (isValid && formik.isValid) {
                        setTimeout(
                          () => { handleSubmit(formik.values) }, 1000
                        )
                      } else {

                        console.log(isValid);
                        let errors = Object.keys(formik.errors);
                        console.log(errors);


                        toast(
                          <div className="bg-white">
                            <ddl className="list-disc">
                              <dt className="text-red-500">Champ(s) requis :</dt>
                              {errors.map((error, index) => (
                                <dd key={index}>- {error}</dd>
                              ))}
                            </ddl>
                          </div>
                        ,{
                          position: "top-right",
                        });
                      }
                    }
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
