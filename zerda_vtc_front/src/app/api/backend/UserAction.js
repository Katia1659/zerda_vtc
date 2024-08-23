import * as URL from "../urls/backendURL";
import apiBackEnd from "../config";

/**
 * 
 * @author Lamri Kaouthar
 */

// enregistrer un nouveux utilisateur
export function createUser(values)
{
    return apiBackEnd.post(URL.URL_BACKEND_Users, values, {
      headers: {
        "Content-Type": "'multipart/form-data",
      }
    });

}

//convoquer toutes les utilisateurs
export function getallUsers()
{
    return apiBackEnd.get(URL.URL_BACKEND_Users);
}

//chercher un utilisateur par email 

export function getUserByEmail(email)
{
    return apiBackEnd.get(URL.URL_BACKEND_Users + '/email/' + email);
}

