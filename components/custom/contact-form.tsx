import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export default function ContactForm( {handleSubmit, handleStart, callStarted} ) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const allFieldsFilled = firstName && lastName && email && phone;
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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
    <div className="space-y-2">
    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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
    <div className="space-y-2">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
    <div className="space-y-2">
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
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
    {!callStarted && 
    <Button 
    onClick={handleStart} 
    type="submit" 
    className="w-full"
    disabled={!allFieldsFilled}
    >
    Start Inquiry Call
    </Button>
    }
    </form>
    )
}