import React, { useState, useContext } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { LeadsContext } from "../context/LeadsContext";
import { getStatusColor } from "../utils/statusColors";

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  contact: string;
  email: string;
  status: string;
  qualification: string;
  interest: string;
  source: string;
  assignedTo: string;
  altPhone?: string;
  altEmail?: string;
  jobInterest?: string;
  state?: string;
  city?: string;
  passoutYear?: string;
  heardFrom?: string;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ open, onClose }) => {
  const context = useContext(LeadsContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!context) {
    throw new Error('AddLeadModal must be used within a LeadsProvider');
  }

  const { addLead } = context;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError(null);
    
    const leadData = {
      ...data,
      statusColor: getStatusColor(data.status),
      updatedAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    const result = await addLead(leadData);
    setSubmitting(false);
    
    if (result.success) {
      reset();
      onClose();
    } else {
      setSubmitError(result.error || "Failed to add lead");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[35%] p-8 py-4 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-3">Add Lead</h2>
        {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-2">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Name*</label>
            <input 
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.name ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>
          
          {/* Phone */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Phone*</label>
            <input 
              {...register("contact", { 
                required: "Phone is required",
                pattern: {
                  value: /^[0-9\-\+\(\)\s]+$/,
                  message: "Invalid phone number"
                }
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.contact ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
            />
            {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message}</span>}
          </div>

          {/* Alt Phone */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Alt. Phone</label>
            <input 
              {...register("altPhone")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Email*</label>
            <input 
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${errors.email ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Alt Email */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Alt. Email</label>
            <input 
              type="email"
              {...register("altEmail")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Status*</label>
            <div className="relative">
              <select 
                {...register("status", { required: "Status is required" })}
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none ${errors.status ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
              >
                <option value="">Select status</option>
                <option value="New">New</option>
                <option value="Follow-Up">Follow-Up</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
          </div>

          {/* Qualification */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Qualification*</label>
            <div className="relative">
              <select 
                {...register("qualification", { required: "Qualification is required" })}
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none ${errors.qualification ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.qualification && <span className="text-red-500 text-xs">{errors.qualification.message}</span>}
          </div>

          {/* Interest Field */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Interest Field*</label>
            <div className="relative">
              <select 
                {...register("interest", { required: "Interest field is required" })}
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none ${errors.interest ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
              >
                <option value="">Select interest field</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.interest && <span className="text-red-500 text-xs">{errors.interest.message}</span>}
          </div>

          {/* Source */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Source*</label>
            <div className="relative">
              <select 
                {...register("source", { required: "Source is required" })}
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none ${errors.source ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Cold Call">Cold Call</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.source && <span className="text-red-500 text-xs">{errors.source.message}</span>}
          </div>

          {/* Assigned To */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Assigned To*</label>
            <div className="relative">
              <select 
                {...register("assignedTo", { required: "Assigned to is required" })}
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none ${errors.assignedTo ? "ring-2 ring-red-200" : "focus:ring-2 focus:ring-blue-200"}`}
              >
                <option value="">Select assignee</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Emily Davis">Emily Davis</option>
                <option value="Robert Johnson">Robert Johnson</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.assignedTo && <span className="text-red-500 text-xs">{errors.assignedTo.message}</span>}
          </div>

          {/* Job Interest */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Job Interest</label>
            <div className="relative">
              <select 
                {...register("jobInterest")}
                className="w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select job interest</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* State */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">State</label>
            <input 
              {...register("state")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* City */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">City</label>
            <input 
              {...register("city")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Passout Year */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-1">Passout Year</label>
            <input 
              {...register("passoutYear")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Heard From (full width) */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Heard From</label>
            <input 
              {...register("heardFrom")}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Actions */}
          <div className="col-span-2 flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border font-semibold text-gray-700 hover:bg-gray-100"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal; 