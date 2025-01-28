import { useState } from "react";

export default function EmailForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    recipientName: "",
    emailType: "Meeting Request",
    keyPoints: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyPointsArray = formData.keyPoints.split(",").map((point) => point.trim());
    onSubmit({ ...formData, keyPoints: keyPointsArray });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email Purpose</label>
        <select
          name="emailType"
          value={formData.emailType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Meeting Request</option>
          <option>Follow Up</option>
          <option>Thank You</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Key Points (comma-separated)</label>
        <textarea
          name="keyPoints"
          value={formData.keyPoints}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Generate Email
      </button>
    </form>
  );
}