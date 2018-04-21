import * as Util from './Util'
/**
 * @typedef {Object} Error
 * @property {number} code Error code
 * @property {String} message Error message
 */
/**
 * @typedef {Object} Response
 * @property {Error} code Error code
 * @property {Object} data Error message
 */

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns {Error} Error or null
 */
export async function login(username, password) {
    await Util.wait(1500);
    return {
        data: {
            username: username,
            sessionID: "TEST",
            email: "asd@asd.com"
        }
    };
}

export async function register(username, password, email) {
    await Util.wait(2000);
    return {
        data: {
            username: username,
            sessionID: "TEST",
            email: "asd@asd.com"
        }
    };
}

export async function isUsernameAvailable(username) {
    await Util.wait(500);
    return Math.random() < 0.5;
}