import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/TodoAdd';
import About from './components/pages/About'
import UUID from 'uuid/v4'

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick (){
    this.setState({
      date: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: 3,
        title: 'Boss meeting',
        completed: false
      }
    ]
  }

  markComplete = (id) => {
    console.log(id);
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  delTodo = (id) => {
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
  }

  addTodo = (title) =>{
    const newTodo = {
      id: UUID(),
      title: title,
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]});
  }

  render(){
    console.log(this.state.todos)
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <Route exact path = "/" render = {props => (
            <React.Fragment>
              <AddTodo addTodo = {this.addTodo}/>
              <Todos increment todos = {this.state.todos} markComplete = {this.markComplete} delTodo = {this.delTodo}/>
            </React.Fragment>
          )}>
          </Route>
          <Route path = "/about" component = {About}>

          </Route>
        </div>
      </div>
      </Router>
    );
  }
  
}

export default App;
