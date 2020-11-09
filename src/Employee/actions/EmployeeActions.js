import axios from 'axios';
const baseUrl = 'https://sb-employee-api.herokuapp.com/api/v1/employees';

export const getEmployee = async id => {
		let response =await axios.get(`${baseUrl}/${id}`)
		return response.data;
}
export const getEmployees = async () => {
		let response =await axios.get(`${baseUrl}`)
		return response.data;
}
