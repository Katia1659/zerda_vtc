import React, {useState} from "react";
import ValidationIdenrifiant from "../components/Inscription/validationIdentifiant";
import ValidatioPersonal from "../components/Inscription/validationInfoPersonel";

import ValidationPhotoProfile from "../components/Inscription/validationPhotoProfile";
import { userInitialValues } from "../components/Inscription";
import { createUser } from "../components/Inscription";



const MultiStepsForms = ()=>{
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(userInitialValues);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

  // Fonction pour sauvegarder les données du formulaire
  const saveFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Fonction pour passer à l'étape suivante
  const nextStep = () => setCurrentStep(currentStep + 1);

  // Fonction pour revenir à l'étape précédente
  const prevStep = () => setCurrentStep(currentStep - 1);
 

  const submit = async (formData) => {
   
     try {
       // Création d'un objet FormData
       const formDataToSend = new FormData();

       // Ajout des données du formulaire à FormData
       for (let key in formData) {
         formDataToSend.append(key, formData[key]);
       }

       console.log("Données du formulaire envoyées:", formDataToSend);

       // Envoi de la requête
       const response = await createUser(formDataToSend);
       setMessage("User registered successfully");
       setError("");
       console.log(response, message);
     } catch (error) {
       setError(error.response?.data?.message || "Registration failed");
       console.log(error);
       setMessage("");
     }
  }

  // Rendu conditionnel en fonction de l'étape actuelle
  switch (currentStep){
    case 1:
      return (
      <ValidationIdenrifiant
          formData={formData}
          saveFormData={saveFormData}
          nextStep={nextStep}
      />
    );
    case 2:
      return (
      <ValidatioPersonal
          formData={formData}
          saveFormData={saveFormData}
          nextStep={nextStep}
          prevStep={prevStep}
      />
    );
    case 3:
      return(
      <ValidationPhotoProfile
          formData={formData}
          saveFormData={saveFormData}
          prevStep={prevStep}
          submit={submit}
      />
    );
    default:
      return (<div>Form completed!</div>);
  }
};


export default MultiStepsForms;