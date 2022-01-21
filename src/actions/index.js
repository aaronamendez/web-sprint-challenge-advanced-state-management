import axios from 'axios';

export const FETCH_START = 'FETCH_START';
export const FETCH_FAIL = 'FETCH_FAIL';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const ADD_SMURF_FAIL = 'ADD_SMURF_FAIL';
export const ADD_SMURF_SUCCESS = 'ADD_SMURF_SUCCESS';

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
			dispatch(fetchSuccess(res.data));
		})
		.catch((err) => dispatch(fetchFail(err.message)));
};

const addSmurfFail = () => {
	return { type: ADD_SMURF_FAIL };
};

const addSmurfSuccess = (newSmurf) => {
	return { type: ADD_SMURF_SUCCESS, payload: newSmurf };
};

export const addSmurf = (newSmurf) => (dispatch) => {
	if (
		newSmurf.name === '' ||
		newSmurf.position === '' ||
		newSmurf.nickname === ''
	) {
		//dispatch a custom error action
		dispatch(addSmurfFail());
	} else {
		//dispatch an addSmurf action
		dispatch(addSmurfSuccess(newSmurf));
	}
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made. Done.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary) Done.
//3. Add a standard action that allows us to set the value of the error message slice of state. Done.
