import { Component } from "react";
import React from 'react';
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component{
    constructor(props){
        super(props);
        this.state = {counter: 0};
    }

    componentDidMount(){
        this.timerID = setInterval(() => 
            this.updateTodoCounter(),
            1000
        )
    }


    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updateTodoCounter(){
        this.setState((state, props) => ({
            counter: state.counter + props.increment
        }));
    }



    render(){

        

        return (
            <div>
                <h1>Hello, this is a counter!</h1>
                <h2>The current value is {this.state.counter}</h2>
                {this.props.todos.map((todo)=> (
                    <TodoItem key={todo.id} todo={todo} markComplete = {this.props.markComplete} delTodo = {this.props.delTodo}/>
                ))}
            </div>
        );
    }
}


// PropTypes
Todos.propTypes = {

    todos: PropTypes.array.isRequired       
}

export default Todos;