import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Vendor {
  _id: string;
  vendorName: string;
  companyName: string;
  email: string;
  contactNumber: string;
  businessAddress: string;
  taxNumber: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BaseURL = "http://localhost:3000/api";

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  const getVendor = async () => {
    try {
      const res = await axios.get(`${BaseURL}/vendors/get-vendor-by-id/${id}`);

      setVendor(res.data.data);
    } catch (error: any) {
      alert(error.response?.data?.message || "Vendor not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendor();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex justify-center items-center h-screen">
        Vendor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Vendor Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Info label="Vendor Name" value={vendor.vendorName} />

          <Info label="Company Name" value={vendor.companyName} />

          <Info label="Email" value={vendor.email} />

          <Info label="Contact Number" value={vendor.contactNumber} />

          <Info label="Tax Number" value={vendor.taxNumber || "N/A"} />

          <Info label="Category" value={vendor.category || "N/A"} />

          <Info
            label="Status"
            value={vendor.isActive ? "Active" : "Inactive"}
          />

          <Info
            label="Created At"
            value={new Date(vendor.createdAt).toLocaleDateString()}
          />

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700">
              Business Address
            </h3>

            <p className="mt-2 border rounded-lg p-4 bg-gray-50">
              {vendor.businessAddress}
            </p>
          </div>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Back
        </button>

      </div>

    </div>
  );
}

interface InfoProps {
  label: string;
  value: string;
}

function Info({ label, value }: InfoProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-700">
        {label}
      </h3>

      <p className="mt-2 border rounded-lg p-3 bg-gray-50">
        {value}
      </p>
    </div>
  );
}

export default VendorDetails;