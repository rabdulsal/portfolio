import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ContactFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  loading: boolean;
  callStarted: boolean;
}

export default function ContactForm({ onSubmit, loading, callStarted }: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const allFieldsFilled = firstName && lastName && email && phone;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <br />
      <h3 className="text-lg font-semibold">Leave some details and chat with an agent!</h3>
      
      {/* Names row */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-left">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex-1 space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-left">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Email and Phone row */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex-1 space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-left">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {!callStarted && (
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white"
          disabled={!allFieldsFilled || loading}
        >
          Start Inquiry Call
        </Button>
      )}
    </form>
  );
}