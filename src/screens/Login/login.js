import "./login.scss";
import React from "react";
import { connect } from "react-redux";
import { loginUser, signupUser } from "../../redux/actions/authentication";
import { useForm } from "react-hook-form";
import SignUp from "./SignUp";
// email: "dannd@example.com",
// password: "238523a",
export function Login(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  console.log(watch());
  console.log(`Console.log  =>  ~ Login ~ errors`, errors);
  const loginSubmit = (data) => {
    console.log(`Console.log  =>  ~ loginSubmit ~ loginSubmit`);
    const payload = {
      email: data.email,
      password: data.password,
    };
    props.loginUser(payload);
  };

  const handleSubmitSignUp = (data) => {
    const payload = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    if (props.signupUser(payload)) console.log("sign up success");
    else console.log("sign up failed");
  };

  return (
    <div id="login">
      <div className="dropdown">
        <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
          <div className="ms-auto">
            {/* ---------------LOG-IN-------------- */}
            <button
              className="navbar-brand btn log-btn rounded"
              id="logInDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Log In
            </button>
            <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="logInDropdown">
              <button className="btn dropdown-header">
                <form className="form" onSubmit={handleSubmit(loginSubmit)}>
                  <h4 className="form__title">Log In</h4>
                  {/* ---------------Email------------- */}
                  <div className="form_div">
                    <input
                      type="text"
                      className="form__input"
                      placeholder=" "
                      {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                    />
                    <label className="form__label">Email</label>
                  </div>
                  {errors.email?.type === "required" && <span>Email is required</span>}
                  {errors.email?.type === "pattern" && <span>Email pattern is wrong.</span>}
                  {/* ---------------Password--------------- */}
                  <div className="form_div">
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      {...register("password", { required: true, minLength: 6, maxLength: 30 })}
                    />
                    <label className="form__label">Password</label>
                  </div>
                  {errors.password?.type === "required" && <span>password is required.</span>}
                  {errors.password?.type === "minLength" && <span>password minLength is 7</span>}
                  {errors.password?.type === "maxLength" && <span>password maxLength is 30</span>}
                  {/* ---------------SUBMIT--------------- */}
                  <input type="submit" className="form__button mb-3" value="Login" />
                </form>
              </button>
            </div>

            {/* ---------------SIGN-UP-------------- */}
            <button
              className="navbar-brand btn log-btn rounded"
              id="signUpDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sign Up
            </button>
            <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="signUpDropdown">
              <button className="btn dropdown-header">
                <SignUp />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const payload = {
//       email: event.target.email.value,
//       password: event.target.password.value,
//     };
//     this.props.loginUser(payload);
//   }

//   handleSubmitSignUp(event) {
//     event.preventDefault();
//     const payload = {
//       user: {
//         username: event.target.username.value,
//         email: event.target.email.value,
//         password: event.target.password.value,
//       },
//     };

//     if (this.props.signupUser(payload)) console.log("sign up success");
//     else console.log("sign up failed");
//   }

//   render() {
//     return (
//       <div id="login">
//         <div className="dropdown">
//           <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
//             <div className="ms-auto">
//               {/* ---------------LOG-IN-------------- */}
//               <button
//                 className="navbar-brand btn log-btn rounded"
//                 id="logInDropdown"
//                 data-bs-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 Log In
//               </button>
//               <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="logInDropdown">
//                 <button className="btn dropdown-header">
//                   <form className="form" onSubmit={this.handleSubmit}>
//                     <h4 className="form__title">Log In</h4>
//                     {/* ---------------Email------------- */}
//                     <div className="form_div">
//                       <input type="text" className="form__input" placeholder=" " name="email" />
//                       <label className="form__label">Email</label>
//                     </div>
//                     {/* ---------------Password--------------- */}
//                     <div className="form_div">
//                       <input type="password" className="form__input" placeholder=" " name="password" />
//                       <label className="form__label">Password</label>
//                     </div>
//                     {/* ---------------SUBMIT--------------- */}
//                     <input type="submit" className="form__button mb-3" value="Login" />
//                   </form>
//                 </button>
//               </div>

//               {/* ---------------SIGN-UP-------------- */}
//               <button
//                 className="navbar-brand btn log-btn rounded"
//                 id="signUpDropdown"
//                 data-bs-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 Sign Up
//               </button>
//               <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="signUpDropdown">
//                 <button className="btn dropdown-header">
//                   <form className="form" onSubmit={this.handleSubmitSignUp}>
//                     <h4 className="form__title">Sign Up</h4>
//                     {/* ---------------username--------------- */}
//                     <div className="form_div">
//                       <input type="text" className="form__input" placeholder=" " name="username" />
//                       <label className="form__label">Username</label>
//                     </div>
//                     {/* ---------------Email------------- */}
//                     <div className="form_div">
//                       <input type="text" className="form__input" placeholder=" " name="email" />
//                       <label className="form__label">Email</label>
//                     </div>
//                     {/* ---------------Password--------------- */}
//                     <div className="form_div">
//                       <input type="password" className="form__input" placeholder=" " name="password" />
//                       <label className="form__label">Password</label>
//                     </div>

//                     {/* ---------------SUBMIT--------------- */}
//                     <input type="submit" className="form__button mb-3" value="Sign Up" />
//                   </form>
//                 </button>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>

//     );
//   }
// }

const Container = connect(null, { loginUser, signupUser })(Login);

export default Container;
