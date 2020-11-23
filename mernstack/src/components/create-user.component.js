import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component
{
    constructor(props)
    {
        super(props);

        this.enterName = this.enterName.bind(this);
        this.enterAge = this.enterAge.bind(this);
        this.enterCell = this.enterCell.bind(this);
        this.submit = this.submit.bind(this);

        this.state ={
            firstname: '',
            age: 0,
            cellNum: '',
            users: []            
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.firstname),
                firstname: response.data[0].firstname
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    enterName(e)
    {
        this.setState({firstname: e.target.value});
    }

    enterAge(e)
    {
        this.setState({age: e.target.value});
    }

    enterCell(e)
    {
        this.setState({cellNum: e.target.value});
    }

    submit(e)
    {
        e.preventDefault();

        const users ={
            firstname: this.state.firstname,
            age: this.state.age,
            cellNum: this.state.cellNum
        }
        console.log(users);

        window.location = '/';

        axios.post('https://localhost:5000/users/add', users)
            .then(res => console.log(res.data));

        this.setState(
            {
                firstname: "",
                age: 0,
                cellNum: ""
            })
    }

    

    render() {
        return (
        <div>
          <h3>Create New User Profile</h3>
          <form submit={this.submit}>
            <div className="form-group"> 
              <label>First Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.firstname}
                  onChange={this.enterName}>
                  
              </input>
            </div>
            <div className="form-group"> 
              <label>Age: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.age}
                  onChange={this.enterAge}
                  />
            </div>
            <div className="form-group">
              <label>Cell Number: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.cellNum}
                  onChange={this.enterCell}
                  />
            </div>
            
    
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }

    
}