import { Fragment } from "react";
import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const actionData = useActionData();
  console.log(actionData.errors);

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Fragment>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {actionData?.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {actionData?.message && <p>{actionData.message}</p>}
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
