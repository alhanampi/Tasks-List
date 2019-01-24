import React, { Component } from 'react';
import './App.css';
import Tasks from './Tasks'

//set state with updater and callback. Calling the callback once the info is saved
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { //either tasks data already in localstorage, or the default one
      tasks: JSON.parse(localStorage.getItem('listData')) ||
        [{
          id: 1,
          text: 'Comprar harina y tomates.',
          done: false
        }],
    }

    //function binding:
    this.inputChange = this.inputChange.bind(this)
    this.pushTask = this.pushTask.bind(this)
    this.eraseTask = this.eraseTask.bind(this)
    this.taskComplete = this.taskComplete.bind(this)
    this.storage = this.storage.bind(this)

  }

  //functions:
  inputChange(e) {
    this.setState({
      taskBar: e.target.value
    })
  }

  //new elements:
  pushTask() {
    const id = this.state.tasks.length === 0 ? (1) : this.state.tasks[this.state.tasks.length - 1].id + 1

    let newTask = {
      id: id,
      text: this.state.taskBar,
      done: false
    }

    let taskList = this.state.tasks

    //making sure the input is not void:
    if (newTask.text && newTask.text.trim().length) {
      taskList.push(newTask)
    } else {
      alert('no hay texto')
    }
    this.setState({
      tasks: taskList
    }, this.storage) //callback
  }

  //buttons functionality:
  taskComplete(id) {
    const taskState = this.state.tasks

    for (var i = 0; i < taskState.length; i++) {
      if (taskState[i].id === id) {
        if (taskState[i].done === false) {
          taskState[i].done = true
        } else {
          taskState[i].done = false
        }
      }
      this.setState({
        tasks: taskState
      }, this.storage) //callback
    }
  }

  eraseTask(id) {
    const taskId = this.state.tasks

    for (var i = 0; i < taskId.length; i++) {
      if (taskId[i].id === id) {
        taskId.splice(i, 1)
      }
    }
    this.setState({
      tasks: taskId
    }, this.storage) //callback
  }


  //local storage: 
  storage() {
    localStorage.setItem('listData', JSON.stringify(this.state.tasks))
  }

  //rendering:
  render() {

    const list = this.state.tasks.map((m) => {
      return <Tasks key={m.id} taskComplete={this.taskComplete} eraseTask={this.eraseTask} tasks={m} />
    })
    return (

      <div>
        <h1>Lista de Tareas</h1>
        <div className="inputBox">

          <input type="text" value={this.state.taskBar} onChange={this.inputChange} placeholder="ingrese tarea nueva"></input>
          <button type="button"><i className="far fa-clipboard" onClick={this.pushTask}></i></button>
        </div>
        <table>
          <tbody>

            {list}

          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
