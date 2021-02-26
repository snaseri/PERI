import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vfirstname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Your name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vlastname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Your last name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };

    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeRole = (e) => {
        let index;
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            roles.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = roles.indexOf(e.target.value)
            roles.splice(index, 1)
        }
        console.log(roles);
        setRoles(roles);

    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(firstname, lastname, email, password, roles).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const [content, setContent] = useState("");


    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(
                    <div className="col-md-12">
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form onSubmit={handleRegister} ref={form}>
                            {!successful && (
                                <div>

                                    <div className="form-group">
                                        <label htmlFor="firstname">Firstname</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            value={firstname}
                                            onChange={onChangeFirstname}
                                            validations={[required, vfirstname]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastname">Lastname</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            value={lastname}
                                            onChange={onChangeLastname}
                                            validations={[required, vlastname]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="new-user-email"
                                            value={email}
                                            onChange={onChangeEmail}
                                            validations={[required, validEmail]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="new-user-password"
                                            value={password}
                                            onChange={onChangePassword}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <div>
                                        <input type="checkbox" name="role" value="designer" onChange={onChangeRole}/> designer
                                        <input type="checkbox" name="role" value="technical" onChange={onChangeRole}/> technical
                                        <input type="checkbox" name="role" value="admin" onChange={onChangeRole}/> admin
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>

                            <div className="form-group">
                                <label htmlFor="firstname">Firstname</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChangeFirstname}
                                    validations={[required, vfirstname]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname">Lastname</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChangeLastname}
                                    validations={[required, vlastname]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div>
                                <input type="checkbox" name="role" value="designer" onChange={onChangeRole}/> designer
                                <input type="checkbox" name="role" value="technical" onChange={onChangeRole}/> technical
                                <input type="checkbox" name="role" value="admin" onChange={onChangeRole}/> admin
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
        );
};

export default Register;