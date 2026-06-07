import React, { useState } from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { BloodGroup, Donor } from '../types';

interface DonorRegistrationProps {
  onRegister: (donor: Omit<Donor, 'id' | 'registrationDate'>) => void;
}

export default function DonorRegistration({ onRegister }: DonorRegistrationProps) {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Quick and simple form gathering
    const newDonor = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string, 10),
      gender: formData.get('gender') as string,
      bloodGroup: formData.get('bloodGroup') as BloodGroup,
      contact: formData.get('contact') as string,
      email: formData.get('email') as string,
      location: formData.get('location') as string,
      lastDonationDate: (formData.get('lastDonationDate') as string) || null,
    };

    onRegister(newDonor);
    setSubmitted(true);
    
    // Reset submitted state after ~4 seconds
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 4000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for joining our donor network. Your contribution is invaluable to saving lives. 
          We will contact you when there is a critical need for your blood group.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-red-600 font-medium hover:text-red-700"
        >
          Register another donor
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
      <div className="bg-red-50 p-6 md:p-8 border-b border-red-100">
        <div className="flex items-center space-x-4">
          <div className="bg-red-600 p-3 rounded-xl shadow-inner text-white">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donor Registration</h2>
            <p className="text-red-800 mt-1">Please fill out this form accurately to join our life-saving roster.</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name" name="name" type="text" placeholder="John Doe" required />
          <InputGroup label="Age" name="age" type="number" min="18" max="65" placeholder="Must be 18-65" required />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow bg-white text-gray-900">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select name="bloodGroup" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow bg-white text-gray-900">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <InputGroup label="Contact Number" name="contact" type="tel" placeholder="+1 (555) 000-0000" required />
          <InputGroup label="Email Address" name="email" type="email" placeholder="john@example.com" required />
          <InputGroup label="Residential Area/City" name="location" type="text" placeholder="Downtown District" required />
          <InputGroup label="Last Donation Date (if any)" name="lastDonationDate" type="date" />
        </div>

        <div className="pt-6 mt-6 border-t border-gray-100 flex items-start space-x-3">
          <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I hereby declare that all the information provided above is true to my knowledge. I consent to be contacted for blood donation during emergencies.
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors focus:ring-4 focus:ring-red-200"
        >
          Register as Donor
        </button>
      </form>
    </div>
  );
}

function InputGroup({ label, name, type, placeholder, required = false, min, max }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
}
