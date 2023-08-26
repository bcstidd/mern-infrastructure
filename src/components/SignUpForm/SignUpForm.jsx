import React, { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import passwordValidator from 'password-validator'; // Add this import

const schema = new passwordValidator(); // Create an instance of the schema
schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols();

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (!schema.validate(this.state.password)) {
        this.setState({ error: 'Password does not meet requirements' });
        return;
      }
      const formData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  } 

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
            <div className="password-requirements">
              <p>Password must be a minimum 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.</p>
            </div>
        <div className="form-container">
          <form autoComplete="on" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} required />
            <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <input type="password" placeholder="Confirm password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
