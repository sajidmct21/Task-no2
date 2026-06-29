// import axios from "axios";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  interface UserToken {
    id: string;
    username: string;
    email: string;
    role:string,
    exp: number;
    iat: number;
  }

  const BaseURL = 'http://localhost:3000/api'
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values: { username: string, email: string, password: string }) => {
    try {
      // console.log(values);

      const res = await axios.post(`${BaseURL}/user/login`, values);
      // console.log(res.data);
      const decoded = jwtDecode<UserToken>(res.data.token);
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(decoded))
      console.log(decoded.role);
      if(decoded.role === 'user'){
        navigate('/user')
      }
      if(decoded.role === 'admin'){
        navigate('/admin')
      }
      if(decoded.role === 'vendor'){
        navigate('/vendor')
      }
      alert("Login Successful");
    } catch (error: any) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-5">

            {/* Username */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;