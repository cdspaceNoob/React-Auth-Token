import { Fragment } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Fragment>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Login" : "create new user"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AuthForm;