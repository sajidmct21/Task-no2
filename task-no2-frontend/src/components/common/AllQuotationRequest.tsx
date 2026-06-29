// import axios from "axios";
// import { useEffect, useState } from "react";

// interface Quotation {
//   _id: string;
//   title: string;
//   description: string;
//   requiredDate: string;
//   status: string;
//   createdAt: string;
//   createdBy: {
//     _id: string;
//     email: string;
//   };
// }

// function AllQuotationRequest() {
//   const BaseURL = "http://localhost:3000/api";

//   const [quotations, setQuotations] = useState<Quotation[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   const getAllQuotations = async () => {
//     try {
//       const res = await axios.get(
//         `${BaseURL}/quotation-request/get-all-quotation-request`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setQuotations(res.data.data);
//     } catch (error: any) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed to fetch quotations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllQuotations();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-xl font-semibold">
//         Loading quotation requests...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">

//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Quotation Requests
//         </h1>

//         {quotations.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No quotation requests found.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">

//             <table className="min-w-full border border-gray-300">

//               <thead className="bg-blue-600 text-white">

//                 <tr>
//                   <th className="px-4 py-3 border">Title</th>
//                   <th className="px-4 py-3 border">Description</th>
//                   <th className="px-4 py-3 border">Required Date</th>
//                   <th className="px-4 py-3 border">Created By</th>
//                   <th className="px-4 py-3 border">Status</th>
//                   <th className="px-4 py-3 border">Created At</th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {quotations.map((quotation) => (
//                   <tr
//                     key={quotation._id}
//                     className="hover:bg-gray-100 transition"
//                   >
//                     <td className="border px-4 py-3">
//                       {quotation.title}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {quotation.description}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {new Date(
//                         quotation.requiredDate
//                       ).toLocaleDateString()}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {quotation.createdBy.email}
//                     </td>

//                     <td className="border px-4 py-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-white text-sm ${
//                           quotation.status === "Draft"
//                             ? "bg-yellow-500"
//                             : quotation.status === "Published"
//                             ? "bg-green-600"
//                             : "bg-red-600"
//                         }`}
//                       >
//                         {quotation.status}
//                       </span>
//                     </td>

//                     <td className="border px-4 py-3">
//                       {new Date(
//                         quotation.createdAt
//                       ).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllQuotationRequest;



import axios from "axios";
import { useEffect, useState } from "react";

interface Quotation {
  _id: string;
  title: string;
  description: string;
  requiredDate: string;
  status: string;
  createdAt: string;
  createdBy: {
    _id: string;
    email: string;
  };
}

function QuotationList() {
  const BaseURL = "http://localhost:3000/api";
  const token = localStorage.getItem("token");

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [editedQuotation, setEditedQuotation] = useState({
    title: "",
    description: "",
    requiredDate: "",
    status: "",
  });

  const getAllQuotations = async () => {
    try {
      const res = await axios.get(
        `${BaseURL}/quotation-request/get-all-quotation-request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuotations(res.data.data);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to fetch quotations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllQuotations();
  }, []);

  const handleEdit = (quotation: Quotation) => {
    setEditingId(quotation._id);

    setEditedQuotation({
      title: quotation.title,
      description: quotation.description,
      requiredDate: quotation.requiredDate.slice(0, 10),
      status: quotation.status,
    });
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put(
        `${BaseURL}/quotation-request/${id}`,
        editedQuotation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuotations((prev) =>
        prev.map((quotation) =>
          quotation._id === id
            ? {
                ...quotation,
                ...editedQuotation,
              }
            : quotation
        )
      );

      setEditingId(null);

      alert("Quotation updated successfully.");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BaseURL}/quotation-request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuotations((prev) =>
        prev.filter((quotation) => quotation._id !== id)
      );

      alert("Quotation deleted successfully.");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Quotation Requests
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border border-gray-300">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="border p-3">Title</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Required Date</th>
                <th className="border p-3">Created By</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

              {quotations.map((quotation) => (

                <tr
                  key={quotation._id}
                  className="hover:bg-gray-50"
                >

                  {/* Title */}

                  <td className="border p-3">

                    {editingId === quotation._id ? (

                      <input
                        type="text"
                        value={editedQuotation.title}
                        onChange={(e) =>
                          setEditedQuotation({
                            ...editedQuotation,
                            title: e.target.value,
                          })
                        }
                        className="border rounded w-full p-2"
                      />

                    ) : (

                      quotation.title

                    )}

                  </td>

                  {/* Description */}

                  <td className="border p-3">

                    {editingId === quotation._id ? (

                      <textarea
                        rows={2}
                        value={editedQuotation.description}
                        onChange={(e) =>
                          setEditedQuotation({
                            ...editedQuotation,
                            description: e.target.value,
                          })
                        }
                        className="border rounded w-full p-2"
                      />

                    ) : (

                      quotation.description

                    )}

                  </td>

                  {/* Required Date */}

                  <td className="border p-3">

                    {editingId === quotation._id ? (

                      <input
                        type="date"
                        value={editedQuotation.requiredDate}
                        onChange={(e) =>
                          setEditedQuotation({
                            ...editedQuotation,
                            requiredDate: e.target.value,
                          })
                        }
                        className="border rounded p-2"
                      />

                    ) : (

                      new Date(
                        quotation.requiredDate
                      ).toLocaleDateString()

                    )}

                  </td>

                  {/* Created By */}

                  <td className="border p-3">
                    {quotation.createdBy.email}
                  </td>

                  {/* Status */}

                  <td className="border p-3">

                    {editingId === quotation._id ? (

                      <select
                        value={editedQuotation.status}
                        onChange={(e) =>
                          setEditedQuotation({
                            ...editedQuotation,
                            status: e.target.value,
                          })
                        }
                        className="border rounded p-2"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">
                          Published
                        </option>
                        <option value="Closed">
                          Closed
                        </option>
                      </select>

                    ) : (

                      <span
                        className={`px-3 py-1 rounded text-white text-sm ${
                          quotation.status === "Draft"
                            ? "bg-yellow-500"
                            : quotation.status === "Published"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {quotation.status}
                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td className="border p-3">

                    {editingId === quotation._id ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleSave(quotation._id)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
                        >
                          Cancel
                        </button>

                      </div>

                    ) : (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(quotation)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(quotation._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                        >
                          Delete
                        </button>

                      </div>

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

export default QuotationList;