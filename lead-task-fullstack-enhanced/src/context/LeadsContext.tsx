import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Lead {
  _id?: string;
  name: string;
  contact: string;
  email?: string;
  status: string;
  qualification: string;
  interest: string;
  source: string;
  assignedTo: string;
  updatedAt: string;
  statusColor: string;
}

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  addLead: (leadData: Partial<Lead>) => Promise<{ success: boolean; error?: string }>;
  fetchLeads: () => Promise<void>;
}

export const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

interface LeadsProviderProps {
  children: ReactNode;
}

export const LeadsProvider = ({ children }: LeadsProviderProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string;


  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_URL}/leads`);
      setLeads(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addLead = async (leadData: Partial<Lead>) => {
    try {
      const response = await axios.post(`${API_URL}/leads`, leadData);
      setLeads([...leads, response.data]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to add lead' };
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <LeadsContext.Provider value={{ leads, loading, error, addLead, fetchLeads }}>
      {children}
    </LeadsContext.Provider>
  );
};