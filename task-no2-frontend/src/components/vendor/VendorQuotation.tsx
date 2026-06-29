import axios from "axios";
import { useEffect, useState } from "react";

interface Assignment {
  _id: string;

  quotationRequest: {
    _id: string;
    title: string;
    description: string;
    requiredDate: string;
  };

  quotedPrice?: number;

  remarks?: string;

  status: string;
}

function VendorQuotation() {
  const BaseURL = "http://localhost:3000/api";

  const token = localStorage.getItem("token");

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [loading, setLoading] = useState(true);

  const [quotationData, setQuotationData] = useState<
    Record<
      string,
      {
        quotedPrice: string;
        remarks: string;
      }
    >
  >({});

  const getAssignments = async () => {
    try {
      const res = await axios.get(
        `${BaseURL}/assignment/vendor-assignment`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setAssignments(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  const submitQuotation = async (id: string) => {
    const data = quotationData[id];

    if (!data?.quotedPrice) {
      alert("Please enter quotation price.");
      return;
    }

    try {
      await axios.put(
        `${BaseURL}/assignment/submit-quotation/${id}`,
        {
          quotedPrice: Number(data.quotedPrice),
          remarks: data.remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Quotation Submitted");

      getAssignments();
    } catch (error: any) {
      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center mb-8">
          Assigned Quotations
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="border p-3">
                  Title
                </th>

                <th className="border p-3">
                  Description
                </th>

                <th className="border p-3">
                  Required Date
                </th>

                <th className="border p-3">
                  Price
                </th>

                <th className="border p-3">
                  Remarks
                </th>

                <th className="border p-3">
                  Status
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {assignments.map((assignment) => (

                <tr key={assignment._id}>

                  <td className="border p-3">
                    {assignment.quotationRequest.title}
                  </td>

                  <td className="border p-3">
                    {assignment.quotationRequest.description}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      assignment.quotationRequest.requiredDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-3">

                    {assignment.status === "Pending" ? (

                      <input
                        type="number"
                        placeholder="Price"
                        className="border rounded p-2 w-full"
                        value={
                          quotationData[assignment._id]
                            ?.quotedPrice || ""
                        }
                        onChange={(e) =>
                          setQuotationData({
                            ...quotationData,
                            [assignment._id]: {
                              ...quotationData[
                                assignment._id
                              ],
                              quotedPrice:
                                e.target.value,
                            },
                          })
                        }
                      />

                    ) : (

                      assignment.quotedPrice

                    )}

                  </td>

                  <td className="border p-3">

                    {assignment.status === "Pending" ? (

                      <textarea
                        rows={2}
                        className="border rounded p-2 w-full"
                        value={
                          quotationData[assignment._id]
                            ?.remarks || ""
                        }
                        onChange={(e) =>
                          setQuotationData({
                            ...quotationData,
                            [assignment._id]: {
                              ...quotationData[
                                assignment._id
                              ],
                              remarks:
                                e.target.value,
                            },
                          })
                        }
                      />

                    ) : (

                      assignment.remarks

                    )}

                  </td>

                  <td className="border p-3">

                    <span
                      className={`px-3 py-1 rounded text-white ${
                        assignment.status ===
                        "Pending"
                          ? "bg-yellow-500"
                          : assignment.status ===
                            "Quoted"
                          ? "bg-green-600"
                          : assignment.status ===
                            "Approved"
                          ? "bg-blue-600"
                          : "bg-red-600"
                      }`}
                    >
                      {assignment.status}
                    </span>

                  </td>

                  <td className="border p-3">

                    {assignment.status ===
                    "Pending" ? (

                      <button
                        onClick={() =>
                          submitQuotation(
                            assignment._id
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Submit
                      </button>

                    ) : (

                      <span className="text-green-600 font-semibold">
                        Submitted
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default VendorQuotation;