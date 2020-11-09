import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {getEmployee, getEmployees} from '../actions/EmployeeActions';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";


const styles = theme => ({
	table: {
		minWidth: 650,
	},
	flex: {
		display: "flex",
	}
});

export default class EmployeePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			searchText: ''
		};
		this.handleOnChangeSearchBox = this.handleOnChangeSearchBox.bind(this);
		this.handleSearchEmployees = this.handleSearchEmployees.bind(this);
	}

	async componentDidMount() {
		getEmployees().then(employee => this.setState({employees: employee})).catch(err => {
			console.error('We have an error trying to get the employees from the backend');
			console.error(err);
		})
	}

	handleOnChangeSearchBox(event) {
		this.setState({searchText: event.target.value});
	}

	handleSearchEmployees() {
		if (this.state.searchText === '') {
			getEmployees().then(employee => this.setState({employees: employee})).catch(err => {
				console.error('We have an error trying to get the employees from the backend');
				console.error(err);
			})
		} else {
			getEmployee(this.state.searchText).then(employee => this.setState({employees: [employee]})).catch(err => {
				console.error('We have an error trying to get the employees from the backend');
				console.error(err);
			})
		}
	}


	render() {
		return (
			<div>
				<form>
					<div className="row bottom-xs">
						<div className="col-xs-2">
							<div className="box">
								<TextField id="standard-basic" label="Search employee by id" value={this.state.searchText}
								           onChange={this.handleOnChangeSearchBox}/>
							</div>
						</div>
						<div className="col-xs-2">
							<div className="box">
								<Button type='button' onClick={this.handleSearchEmployees}>Get Employees</Button>
							</div>
						</div>
					</div>
				</form>
				<TableContainer component={Paper}>
					<Table className={styles.table}>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="left">Role ID</TableCell>
								<TableCell align="left">Role Name</TableCell>
								<TableCell align="left">Role Description</TableCell>
								<TableCell align="left">Monthly Salary</TableCell>
								<TableCell align="left">Hourly Salary</TableCell>
								<TableCell align="left">Annual Salary</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.employees.map((row) => (
								<TableRow key={row.id}>
									<TableCell align="left">{row.id}</TableCell>
									<TableCell align="left">{row.name}</TableCell>
									<TableCell align="left">{row.roleId}</TableCell>
									<TableCell align="left">{row.roleName}</TableCell>
									<TableCell align="left">{row.roleDescription}</TableCell>
									<TableCell align="left">{row.monthlySalary}</TableCell>
									<TableCell align="left">{row.hourlySalary}</TableCell>
									<TableCell align="left">{row.annualSalary}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

		);
	}
}
