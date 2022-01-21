import axios from 'axios';

export const FETCH_START = 'FETCH_START';
export const FETCH_FAIL = 'FETCH_FAIL';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

const fetchStart = () => {
	return { type: FETCH_START };
};
const fetchFail = (error) => {
	return { type: FETCH_FAIL, payload: error };
};
const fetchSuccess = (data) => {
	return { type: FETCH_SUCCESS, payload: data };
};

export const fetchSmurfs = () => (dispatch) => {
	dispatch(fetchStart());
	axios
		.get('http://localhost:3333/smurfs')
		.then((res) => {
			// console.log(res.data);
			dispatch(fetchSuccess(res.data));
		})
		.catch((err) => dispatch(fetchFail(err.message)));
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
