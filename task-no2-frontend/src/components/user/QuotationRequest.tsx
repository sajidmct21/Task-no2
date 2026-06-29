import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface QuotationValues {
  title: string;
  description: string;
  requiredDate: string;
  createdBy: string
}

function QuotationRequest() {
  const navigate = useNavigate();

  const BaseURL = "http://localhost:3000/api";

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token")

  const initialValues: QuotationValues = {
    title: "",
    description: "",
    requiredDate: "",
    createdBy: user.id
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),

    description: Yup.string()
      .min(10, "Description should be at least 10 characters")
      .required("Description is required"),

    requiredDate: Yup.date()
      .nullable()
      .min(new Date(), "Required date cannot be in the past"),
  });

  const handleSubmit = async (
    values: QuotationValues,
    { resetForm }: any
  ) => {
    try {
      const payload = {
        ...values,
        createdBy: user.id,
      };

      const res = await axios.post(
        `${BaseURL}/quotation-request/create-quotation-request`,
        payload,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Quotation Request Created");

      resetForm();

      navigate("/user");
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Quotation Request
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">

            {/* Title */}
            <div>
              <label className="block mb-2 font-medium">
                Title
              </label>

              <Field
                type="text"
                name="title"
                placeholder="Enter quotation title"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>

              <Field
                as="textarea"
                rows={5}
                name="description"
                placeholder="Enter quotation description"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Required Date */}
            <div>
              <label className="block mb-2 font-medium">
                Required Date
              </label>

              <Field
                type="date"
                name="requiredDate"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="requiredDate"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition duration-300"
            >
              Create Quotation Request
            </button>

          </Form>
        </Formik>

      </div>
    </div>
  );
}

export default QuotationRequest;