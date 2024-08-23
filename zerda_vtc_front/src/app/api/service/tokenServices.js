import { jwtDecode } from "jwt-decode";

const TOKEN_NAME = "token";

/**
 *  @author Lamri Kaouthar
 */

/**
 * save the JWT token used for the backend requesrs in  the localStorage
 *
 * @param {string} token: to save
 */

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

/**
 * To get the JWT token back-kend saved in the localstorage
 * @returns {string}
 */

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

/**
 * Delete the token from the localstorage
 */

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}

/**
 * Get the payload of the JWT Token (with experition date, login and roles)
 * @param {string} token
 * @returns {object} payload of the token
 * @returns
 */

export function getPayloadToken(token) {

    return jwtDecode(token);
}

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 * @param {string} token
 * @returns {boolean} true if user is authenticated
 * @returns
 */

export function isTokenValid(token) {
    try {
        const payload = getPayloadToken(token);
        const roles = payload.roles;
        const expirationDate = payload.exp;
        const login = payload.email;
        const dateNow = new Date();
        return (
            token && roles.length > 0 && login && expirationDate < dateNow.getTime()
        );
    } catch {
        return false;
    }
}
