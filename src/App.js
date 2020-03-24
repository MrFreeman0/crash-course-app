import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/TodoAdd';
import About from './components/pages/About'
//import UUID from 'uuid/v4'
import Axios from 'axios';

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
    ]
  }

  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos: res.data}));
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

    Axios.delete(`https://jsonplaceholder.typicode.com/${id}`).then(res => 
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))

  }

  addTodo = (title) =>{
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed : false
    }).then (res => this.setState({todos: [...this.state.todos, res.data]}))
    
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
