import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.firstname}</td>
      <td>{props.user.age}</td>
      <td>{props.user.cellNum}</td>      
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )

export default class UserList extends Component
{
    constructor(props) 
    {
        super(props);
    
        this.deleteUser = this.deleteUser.bind(this)
    
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteUser(id) {
        axios.delete('https:localhost:5000/users/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
      }
      userList() {
        return this.state.users.map(currentUser => {
          return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
        })
    }
        submit(e) {
            e.preventDefault();
        
            const user = {
              firstname: this.state.firstname,
              age: this.state.age,
              cellNum: this.state.cellNum
            }
        
            console.log(user);
        
            axios.post('http://localhost:5000/users/add', user)
              .then(res => console.log(res.data));
        
            this.setState({
              firstname: ''
            })
        
    }
      render() {
        return (
          <div>
            <h3>Current Users</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Firstname</th>
                  <th>Age</th>
                  <th>Cell Number</th>                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.userList() }
              </tbody>
            </table>
          </div>
        )
      }
    }

