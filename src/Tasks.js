import React, { Component } from 'react';
import './App.css'

class Tasks extends Component {

	render() {

		//changing task status from pending to finished, using fontawesome for the icons:
		let taskStatus = ""
		let taskClass = ""
		if (this.props.tasks.done === false) {
			taskStatus = <i className="fas fa-ellipsis-h"></i>
		} else {
			taskStatus = <i className="far fa-check-circle"></i>
			taskClass = "tachado"
		}

		return (

			<tr>
				<td>
					<span className={taskClass}> {this.props.tasks.text} </span>
					<span> {this.props.tasks.done} </span>
				</td>
				<td>
					<button type="Button" className={taskStatus} onClick={() => this.props.taskComplete(this.props.tasks.id)} status={this.props.done}> {taskStatus} </button>
				</td>
				<td>
					<button type="button" onClick={() => this.props.eraseTask(this.props.tasks.id)}><i className="fas fa-trash-alt"></i></button>
				</td>
			</tr>
		)
	}
}

export default Tasks;