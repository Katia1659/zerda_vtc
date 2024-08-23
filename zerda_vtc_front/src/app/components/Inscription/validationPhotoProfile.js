import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./assets/style.css";

const ValidationPhotoProfile = ({
  formData,
  saveFormData,
  prevStep,
  submit,
}) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(formData.photo || null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedPhoto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    if (!uploadedPhoto) {
      toast.error("Veuillez télécharger une photo.");
      return;
    }
    // Ajoutez la photo aux données existantes
    const updatedFormData = {
      ...formData,
      photo: uploadedPhoto,
    };
    saveFormData(updatedFormData);
    submit(updatedFormData); // Appel à la fonction de soumission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control" id="photo-photo">
        <label htmlFor="photo">Photo de Profil :</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Soumettre</button>
      <button type="button" onClick={prevStep}>
        Retour
      </button>
      <Toaster />
    </form>
  );
};

export default ValidationPhotoProfile;
