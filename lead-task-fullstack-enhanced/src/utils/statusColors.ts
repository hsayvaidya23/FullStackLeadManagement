export const statusColors = {
  "New": "bg-blue-100 text-blue-700",
  "Follow-Up": "bg-orange-100 text-orange-700",
  "Qualified": "bg-green-100 text-green-700",
  "Converted": "bg-purple-100 text-purple-700"
} as const;

export const getStatusColor = (status: string): string => {
  return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-700";
}; 