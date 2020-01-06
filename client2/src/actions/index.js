// ----- Action Creators -----
import axios from 'axios';
//@ts-check

/**
 * Sleep function. Must be called inside async function.
 * @param {number} ms Time in milliseconds.
 * @returns {Promise} Return promise to use await.
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get the current authenticated user.
 */
export const fetchUser = () => async dispatch => {
	for (let i = 0; i < 5; i++) {
		try {
			/**@type {{data: {name: string, email: string, photo: string, asd: string}}} */
			const res = await axios.get('/user');
			dispatch({type: 'FETCH_USER', payload: res.data});
			return;
		} catch (err) {
			console.log(err.response);
			await sleep(3000);
		}
	}
};
