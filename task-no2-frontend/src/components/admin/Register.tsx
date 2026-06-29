import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

interface RegisterValues {
  username: string;
  email: string;
  password: string;
  role: string;
}

function Register() {
  const navigate = useNavigate();

  const BaseURL = "http://localhost:3000/api";

  const initialValues: RegisterValues = {
    username: "",
    email: "",
    password: "",
    role: "admin",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    role: Yup.string().required("Role is required"),
  });

  const handleRegister = async (values: RegisterValues,{ resetForm }: any) => {
    // console.log("Register button is clicked");
    try {
      console.log(values);
      const res = await axios.post(`${BaseURL}/user/sign-in`, values);
      console.log(res.data);
      alert(res.data.data || "Registration Successful");

      resetForm();

      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form className="space-y-5">

            {/* Username */}

            <div>
              <label className="block mb-1 font-medium">
                Username
              </label>

              <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}

            <div>
              <label className="block mb-1 font-medium">
                Email
              </label>

              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block mb-1 font-medium">
                Password
              </label>

              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Role */}

            <div>
              <label className="block mb-1 font-medium">
                Role
              </label>

              <Field
                as="select"
                name="role"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
              </Field>

              <ErrorMessage
                name="role"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;