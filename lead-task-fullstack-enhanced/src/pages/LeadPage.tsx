import React, { useState, useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiUsers, FiBell, FiFilter } from "react-icons/fi";
import { CiCalendar, CiSettings } from "react-icons/ci";
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { LuArrowUpDown } from "react-icons/lu";
import { LeadsContext } from "../context/LeadsContext";
import AddLeadModal from "./AddLeadModal";
import LeadFilters from "./LeadFilters";
import { getStatusColor } from "../utils/statusColors";

const navItems = [
  { name: "Dashboard", icon: RxDashboard },
  { name: "Leads", icon: FiUsers, active: true },
  { name: "Follow-Ups", icon: CiCalendar },
  { name: "Sales Activity", icon: TbActivityHeartbeat },
  { name: "Products", icon: BsBoxSeam },
  { name: "Notifications", icon: FiBell },
  { name: "Settings", icon: CiSettings },
];

const LeadPage = () => {
  const context = useContext(LeadsContext);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (!context) {
    throw new Error('LeadPage must be used within a LeadsProvider');
  }

  const { leads, loading, error } = context;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center px-6 font-bold text-xl border-b">LeadCRM</div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                className={`flex items-center px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-r-lg mb-1 ${
                  item.active ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                <IconComponent className="mr-3 text-lg" />
                {item.name}
              </div>
            );
          })}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-[6px] border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-gray-500 text-sm">Manage and track your leads</p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 text-center rounded-lg shadow-sm flex items-center gap-3"
            onClick={() => setAddModalOpen(true)}
          >
            <FaPlus className="text-xl" />
            Add Lead
          </button>
        </div>
        {/* Search & Filters */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Search leads..."
              className="w-4/5 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="flex items-center px-4 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-100"
              onClick={() => setFiltersOpen(true)}
            >
              <FiFilter className="mr-2" /> Filters
            </button>
          </div>
        </div>
        {/* Leads Table */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="overflow-x-auto bg-white rounded-lg shadow border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="px-6 py-3 text-left font-semibold">Name <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Contact <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Status <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Qualification <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Interest <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Source <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-6 py-3 text-left font-semibold">Assigned To</th>
                  <th className="px-6 py-3 text-left font-semibold">Updated At <LuArrowUpDown className="inline-block align-middle ml-1" /></th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead._id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer hover:underline">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.contact}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{lead.qualification}</td>
                    <td className="px-6 py-4">{lead.interest}</td>
                    <td className="px-6 py-4">{lead.source}</td>
                    <td className="px-6 py-4">{lead.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lead.updatedAt}</td>
                    <td className="px-2 py-4 text-gray-400 cursor-pointer font-bold"><FaChevronDown /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddLeadModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
        <LeadFilters open={filtersOpen} onClose={() => setFiltersOpen(false)} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      </main>
    </div>
  );
};

export default LeadPage; 