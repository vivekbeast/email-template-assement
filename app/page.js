"use client";

import { useState } from "react";
import EmailForm from "./components/EmailForm";

export default function HomePage() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setGeneratedEmail("");

    try {
      const response = await fetch("/api/email-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedEmail(data.email);
      } 
    } catch (error) {
      console.error(error);
      setGeneratedEmail("Error generating email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Professional Email Generator</h1>
      <EmailForm onSubmit={handleFormSubmit} />
      {loading ? (
        <p className="mt-4 text-blue-500">Generating email...</p>
      ) : (
        generatedEmail && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">Generated Email:</h2>
            <p>{generatedEmail}</p>
          </div>
        )
      )}
    </main>
  );
}



// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch("/api/email-generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         recipientName: recname,
//         emailType: rcname,
//         keyPoints: cname,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setEmailResult(data.email);
//     } 
//   } catch (error) {
//     console.error("Error submitting form:", error);
//   }
// };