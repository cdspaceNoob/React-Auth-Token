import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthenticationPage = () => {
  return <AuthForm />;
};

export default AuthenticationPage;

export const action = async ({ request }) => {
  // URL은 브라우저 built-in이다.
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "invalid mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    // 여기서 get 메소드는 formData의 반환값(데이터)에 들어있다.
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response; // 이렇게만 해줘도 ReactRouter가 알아서 데이터를 추출한다.
  }

  if (!response.ok) {
    throw json({ message: "could not authenticate user" }, { status: 500 });
  }

  // token

  return redirect("/");
};
