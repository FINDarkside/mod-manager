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
    await Util.wait(1000);
    return {
        data: {
            sessionID: "TEST"
        }
    };
}