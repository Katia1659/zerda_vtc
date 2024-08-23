import { API_GOUV } from "../urls/backendURL";
import axios from "axios";

export async function isAddressValid(address) {
    const baseURL = API_GOUV + '/search/';
    const query = `?q=${encodeURIComponent(address)}&limit=1`;
    try {
        const response = await axios.get(baseURL + query);
        if (!response.ok) {
            throw new Error("probleme lors de la vérification de l'addresse");
        }
        const data = await response.json();
        // Si le nombre de résultats est supérieur à 0, l'adresse est valide
        if (data.features && data.features.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'adresse:', error);
        return false;
    }
}


export async function getAddressSuggestions(value){
    const baseURL = API_GOUV + '/search/?q=';
     try {
       const response = await axios.get(baseURL + value);
       return response;
     } catch (error) {
       console.error("Erreur lors de la récupération des suggestions :", error);
       return {data: {features: []}}; // Return an empty array in case of error
     }

}
