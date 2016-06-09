import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.signIn(props);
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Sign In</h3>
        <div className={`form-group ${username.touched && username.invalid ? "has-danger" : '' }`}>
          <label>Username</label>
          <input type="text" className="form-control" {...username} />
          <div className="text-help">
            {username.touched ? username.error : ""}
          </div>
        </div>
        <div className={`form-group ${password.touched && password.invalid ? "has-danger" : '' }`}>
          <label>Password</label>
          <input type="password" className="form-control" {...password} />
          <div className="text-help">
            {password.touched ? password.error : ""}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <Link to="signup" className="btn btn-danger">Sign Up</Link>
      </form>
    )
  };
}

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = "Enter a username"
  }

  if(!values.password) {
    errors.password = "Enter a password"
  }

  return errors;
}

function mapStateToProps(state) {
  console.log("SignIn state: ", state);
  return { uid: state.auth.uid }
}

export default reduxForm({
  form: 'SignInForm',
  fields: ['username','password'],
  validate
}, mapStateToProps, { signIn })(SignIn)