import axios from "axios";
import { useEffect, useState } from "react";

interface Quotation {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdBy: {
    email: string;
  };
}

interface Vendor {
  _id: string;
  vendorName: string;
  companyName: string;
}

function AssignVendor() {
  const BaseURL = "http://localhost:3000/api";
  const token = localStorage.getItem("token");

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Stores selected vendor for each quotation
  const [selectedVendor, setSelectedVendor] = useState<
    Record<string, string>
  >({});

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
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVendors = async () => {
    try {
      const res = await axios.get(
        `${BaseURL}/vendors/get-all-vendors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVendors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignVendor = async (quotationId: string) => {
    const vendorId = selectedVendor[quotationId];

    if (!vendorId) {
      alert("Please select a vendor.");
      return;
    }

    try {
      await axios.post(
        `${BaseURL}/vendor-assignment/create-assignment`,
        {
          quotationRequest: quotationId,
          vendor: vendorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Vendor assigned successfully.");

      setSelectedVendor((prev) => ({
        ...prev,
        [quotationId]: "",
      }));
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Assignment failed.");
    }
  };

  useEffect(() => {
    Promise.all([getAllQuotations(), getAllVendors()]).finally(() =>
      setLoading(false)
    );
  }, []);

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

        <h1 className="text-3xl font-bold text-center mb-8">
          Assign Vendors
        </h1>

        <div className="overflow-x-auto">

          <table className="min-w-full border">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="border px-4 py-3">Title</th>
                <th className="border px-4 py-3">Description</th>
                <th className="border px-4 py-3">Created By</th>
                <th className="border px-4 py-3">Status</th>
                <th className="border px-4 py-3">Select Vendor</th>
                <th className="border px-4 py-3">Action</th>
              </tr>

            </thead>

            <tbody>

              {quotations.map((quotation) => (

                <tr
                  key={quotation._id}
                  className="hover:bg-gray-50"
                >

                  <td className="border px-4 py-3">
                    {quotation.title}
                  </td>

                  <td className="border px-4 py-3">
                    {quotation.description}
                  </td>

                  <td className="border px-4 py-3">
                    {quotation.createdBy.email}
                  </td>

                  <td className="border px-4 py-3">
                    {quotation.status}
                  </td>

                  <td className="border px-4 py-3">

                    <select
                      value={selectedVendor[quotation._id] || ""}
                      onChange={(e) =>
                        setSelectedVendor((prev) => ({
                          ...prev,
                          [quotation._id]: e.target.value,
                        }))
                      }
                      className="border rounded-lg p-2 w-full"
                    >
                      <option value="">
                        Select Vendor
                      </option>

                      {vendors.map((vendor) => (
                        <option
                          key={vendor._id}
                          value={vendor._id}
                        >
                          {vendor.vendorName} ({vendor.companyName})
                        </option>
                      ))}

                    </select>

                  </td>

                  <td className="border px-4 py-3">

                    <button
                      onClick={() =>
                        assignVendor(quotation._id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Assign
                    </button>

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

export default AssignVendor;