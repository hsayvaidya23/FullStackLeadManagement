import React from "react";
import { FiFilter } from "react-icons/fi";

interface LeadFiltersProps {
  open: boolean;
  onClose: () => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ open, onClose, statusFilter, onStatusFilterChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black bg-opacity-10">
      <div className="w-full max-w-5xl mt-10 bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Leads Management</h1>
          <div className="flex gap-3">
            <button
              className="flex items-center border px-5 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-100"
              onClick={onClose}
            >
              <FiFilter className="mr-2" /> Hide Filters
            </button>
            <button className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold">Add New Lead</button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full px-5 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
          />
        </div>
        {/* Advanced Filters */}
        <div className="bg-gray-50 border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Advanced Filters</h2>
          <div className="flex items-center gap-6 mb-6">
            <span className="font-semibold">Match</span>
            <label className="flex items-center gap-2 font-medium">
              <input type="radio" name="match" defaultChecked className="accent-blue-600" />
              ALL conditions (AND)
            </label>
            <label className="flex items-center gap-2 font-medium">
              <input type="radio" name="match" className="accent-blue-600" />
              ANY condition (OR)
            </label>
          </div>
          {/* Filter Row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1/4">
              <select className="w-full border rounded-lg px-3 py-2 bg-white">
                <option>Status</option>
              </select>
            </div>
            <div className="w-1/2">
              <select
                className="w-full border rounded-lg px-3 py-2 bg-white"
                value={statusFilter}
                onChange={e => onStatusFilterChange(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="New">New</option>
                <option value="Follow-Up">Follow-Up</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
            <button className="text-2xl text-gray-400 hover:text-gray-600">×</button>
          </div>
          <button className="border px-4 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 mb-6">Add Filter</button>
          <div className="flex justify-end gap-3 mt-4">
            <button className="border px-5 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-100">Clear</button>
            <button className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters; 