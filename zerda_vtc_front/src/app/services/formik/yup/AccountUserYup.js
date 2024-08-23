import { getUserByEmail } from '../../../api/backend/UserAction';
import * as Yup from 'yup';
import * as Regex from '../../regex/regexUser';


/**
 * 
 * @author Lamri Kaouthar
 */

// new Date() : Crée un objet Date avec la date et l'heure actuelles.
// setFullYear(dateMax.getFullYear() - 18) : Modifie l'année de l'objet Date pour qu'elle soit 18 ans en arrière par rapport à l'année actuelle.

const dateMax = new Date();
dateMax.setFullYear(dateMax.getFullYear() - 18);

// L'objet Field contien touts les validation pour toutes les files de nortr formulaire pour la réutiluser dans les différentes Shemas de validation: 

const IdentificaFields = {
  email: Yup.string()
    .email(
      'Veuillez entrée un adresse email valide exemple: "youremail@domain.com"'
    )
    .required("L'email est obligatoire")
    .test("email-exists", "cet e-mail est déjà utilisé", async (email) => {
      let isUnique = true;
      try {
        isUnique = await emailValidation(email);
        console.log(isUnique);
        return isUnique;
      } catch (error) {
        console.log("Erreur lors de la vérification de l'email:", error);
        return false; // En cas d'erreur, on considère l'e-mail comme non valide
      }
    }),
  password: Yup.string()
    .required("Le mot de passe est requis")
    .matches(
      Regex.USER_PASSWORD,
      "Veuillez respecter la format recommandée"
    ),
  confirmPassword: Yup.string()
    .required("La confirmation du mot de passe est requise")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
}

const PersonelFields = {
  name: Yup.string()
    .required("champ obligatoire")
    .matches(Regex.USER_NAME, "ce champ ne doit contenir que des lettres")
    .min(1, "le nom doit faire au moins 2 caractères"),
  lastName: Yup.string()
    .required("champ obligatoire")
    .matches(Regex.USER_NAME, "ce champ ne doit contenir que des lettres")
    .min(1, "le prénom doit faire au moins 2 caractères"),
  birthday: Yup.date()
    .required("champ obligatoire")
    .max(dateMax, "vouz devez avoir au moins 18 ans"),
  phone: Yup.string()
    .matches(Regex.USER_PHONE, "numéro de téléphone invalide")
    .required("champ obligatoire"),
  address: Yup.string().required("champ obligatoire"),
};

const ProfileField = {
  photo: Yup.mixed().required("une photo est obligatoire"),
};

// Fonction pour vérifier si l'e-mail existe
async function emailValidation(email) {
    try {

        const response = await getUserByEmail(email);

        if (response.data && response.data.exists) {
            // L'utilisateur existe, donc l'e-mail n'est pas unique 
            return false;
        } else {
            // L'utilisateur n'existe pas, donc l'e-mail est unique
            return true;
        }

    } catch (error) {
        console.error('Erreur lors de la vérification de l\'email:', error);

        return false;  // En cas d'erreur, on retourne false

    }

};

// ValidationSchema formulaire d'inscription
export const schemaIdentificationField = Yup.object().shape(IdentificaFields);

export const schemaPersonelField = Yup.object().shape(PersonelFields);

export const schemaProfileField = Yup.object().shape(ProfileField);
