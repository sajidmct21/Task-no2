import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface VendorValues {
  vendorName: string;
  companyName: string;
  email: string;
  contactNumber: string;
  businessAddress: string;
  taxNumber: string;
  category: string;
}

function Profile() {
  const navigate = useNavigate();

  const BaseURL = "http://localhost:3000/api";

  const initialValues: VendorValues = {
    vendorName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    businessAddress: "",
    taxNumber: "",
    category: "",
  };

  const validationSchema = Yup.object({
    vendorName: Yup.string()
      .min(3, "Vendor name must be at least 3 characters")
      .required("Vendor name is required"),

    companyName: Yup.string()
      .required("Company name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    contactNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Enter a valid contact number")
      .required("Contact number is required"),

    businessAddress: Yup.string()
      .required("Business address is required"),

    taxNumber: Yup.string(),

    category: Yup.string(),
  });

  const handleProfile = async (
    values: VendorValues,
    { resetForm }: any
  ) => {
    try {
      const res = await axios.post(
        `${BaseURL}/vendors/create-vendor`,
        values
      );
      console.log(res.data.data._id);
      localStorage.setItem('id', res.data.data._id)
      alert( "Vendor Registered Successfully");

      resetForm();

      navigate("/vendor");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Vendor Profile
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleProfile}
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Vendor Name */}
            <div>
              <label className="block mb-1 font-medium">
                Vendor Name
              </label>

              <Field
                name="vendorName"
                type="text"
                placeholder="Enter vendor name"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="vendorName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block mb-1 font-medium">
                Company Name
              </label>

              <Field
                name="companyName"
                type="text"
                placeholder="Enter company name"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="companyName"
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
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block mb-1 font-medium">
                Contact Number
              </label>

              <Field
                name="contactNumber"
                type="text"
                placeholder="Enter contact number"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="contactNumber"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Business Address */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Business Address
              </label>

              <Field
                as="textarea"
                rows={3}
                name="businessAddress"
                placeholder="Enter business address"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="businessAddress"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Tax Number */}
            <div>
              <label className="block mb-1 font-medium">
                Tax Number
              </label>

              <Field
                name="taxNumber"
                type="text"
                placeholder="Enter tax number"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <ErrorMessage
                name="taxNumber"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">
                Category
              </label>

              <Field
                as="select"
                name="category"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Groceries">Groceries</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </Field>

              <ErrorMessage
                name="category"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition duration-300"
              >
                Create Profile
              </button>
            </div>

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Profile;