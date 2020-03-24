import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {


    getStyle = () => {
        return {
            background : '#c3c3c3',
            padding : '10px',
            borderBottom : '1px #ccc dotted',
            textDecoration : this.props.todo.completed ? 
            'line-through' : 'none'
        }
    }


    render() {
        const { id, title } = this.props.todo;

        return (
            <div style = {this.getStyle()}>
                <input type="checkbox" onChange = {this.props.markComplete.bind(this, id)}/> {''}
                <p>{title}
                <button onClick={this.props.delTodo.bind(this, id)} style = {btnStyle}>x </button>
                </p>
            </div>
        )
    }
}

//PropTypes

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}


//Styles 
const btnStyle = {
    background : '#ff0000',
    color: '#ffff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem