import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [form, setForm] = useState({ amount: "", unit: "cm" });
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", unit: "cm" });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchRainData();
    }
  }, []);

  const fetchRainData = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/rain", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await axios.post("http://localhost:5500/api/rain", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ amount: "", unit: "cm" });
      setMessage("Rain data added ✅");
      fetchRainData();
    } catch (err) {
      console.error(err);
      setMessage("Submission failed ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/rain/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRainData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setEditForm({ amount: record.amount, unit: record.unit });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:5500/api/rain/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchRainData();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-600">🌧️ Rain Dashboard</h2>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-sm bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="amount"
            type="number"
            placeholder="Enter rainfall amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="cm">Centimeters</option>
            <option value="inch">Inches</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Submit Rainfall
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-blue-600 font-medium">{message}</p>
        )}
      </div>

      {/* Records Section */}
      <div className="w-full max-w-xl mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Past Records</h3>
        <div className="bg-white rounded-xl shadow divide-y border border-gray-200">
          {records.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No entries yet.</p>
          ) : (
            records.map((r) => (
              <div key={r._id} className="p-4 flex justify-between items-center">
                {editingId === r._id ? (
                  <div className="w-full">
                    <div className="flex gap-2 mb-2">
                      <input
                        name="amount"
                        type="number"
                        value={editForm.amount}
                        onChange={handleEditChange}
                        className="w-1/2 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <select
                        name="unit"
                        value={editForm.unit}
                        onChange={handleEditChange}
                        className="w-1/2 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSubmit(r._id)}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-base font-medium text-gray-800">
                        {r.amount} {r.unit}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        {new Date(r.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="text-xs bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}