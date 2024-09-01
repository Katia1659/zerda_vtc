
import {
  React,
  useState,
  AvatarEditor,
  Modal,
  ErrorMessage,
  validFileExtensions,
  isValidFileType,
} from "../index";

sessionStorage.removeItem("profileImage");

export function StepThree({ formik }) {

  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editor, setEditor] = useState(null);
  const [source, setSource] = useState(
    sessionStorage.getItem("profileImage") ||
      "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
  );

  //  const validationSchema = Yup.object().shape(ProfileField)

   const handleConfirm = ()=>{
    if(editor){
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      setSource (canvas);
      sessionStorage.setItem ('profileImage', canvas);
    }
    setIsModalOpen(false);
  }

  const handleCancel = ()=>{
    setIsModalOpen(false);
    setImage(null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && isValidFileType(file.name, "photo")){
      setImage(URL.createObjectURL(file));

      setIsModalOpen(true);
      formik.setFieldValue('photo', file);      
    }else{
      formik.setFieldError("photo", "probleme servenue");
      formik.setFieldTouched("photo", true);
    }

    formik.validateField('photo');
    
  };
  function getAllowedExt(type) {
    const extensions = validFileExtensions[type];
    if (!extensions) return ""; // handle if type is undefined
    return extensions.map((e) => `.${e}`).toString(); // include dot prefix
  }

   const allowedExts = getAllowedExt("photo");
 
  return (
    <div className="flex  justify-center align-items-center my-14 gap-5 ">
      <div className="block gap-5">
        <label className=" flex font-bold rounded-lg font-nunito text-lg  bg-[#d1d3d7] text-[#2f2b2b] justify-center justify-items-center text-center p-3 cursor-pointer">
          <i></i>Télécharger
          <input
            className="hidden"
            id="photo"
            type="file"
            accept={allowedExts}
            onChange={handleImageChange}
          />
        </label>
        <ErrorMessage
          name={"photo"}
          component="div"
          className="text-red-500 font-nunito"
        />
      </div>

      <img src={source} className="w-32 rounded-full shadow-lg" alt="Avatar" />
      {image && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancel}
          title="Ajuster votre voto de profile"
          confirmText="Enregistrer"
          cancelText="Annuler"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          <div>
            <AvatarEditor
              ref={setEditor}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              scale={1.2}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
