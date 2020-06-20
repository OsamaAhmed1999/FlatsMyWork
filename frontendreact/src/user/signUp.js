import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = (Name) => (event) => {
        this.setState({error: ""})
        this.setState({[Name]: event.target.value});

    };

    clickSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,
            email,
            password
        }
        // console.log(user)
        this.signup(user).then(data => {
            if(data.error){
                this.setState({error: data.error, open: false})
            }
            else{
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                })
            }
        })
    };

    signup = user => {
        return axios.post(`http://localhost:8080/signup`,  user )
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.response.data
        })
    };

    render(){
        const {name, email, password, error, open} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert alert-info" style={{display: open ? "" : "none"}}>
                    Account is successfully created. Please <Link to="/signin">Signin</Link>
                </div>
                
                <form>
                   <div className="form-group">
                         <label className="text-muted">Name</label>
                         <input 
                            onChange={this.handleChange("name")} 
                            type="text" 
                            className="form-control"
                            value={name} />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange={this.handleChange("email")} 
                            type="Email"
                            className="form-control"
                            value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange={this.handleChange("password")} 
                            type="Password" 
                            className="form-control"
                            value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    };
}

export default Signup