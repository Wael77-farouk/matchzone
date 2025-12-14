import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 min-h-screen bg-gray-900 text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-red-500">Contact Us</h1>
        <p className="text-lg mt-3 text-gray-400">
          We are here to answer your questions and hear your feedback.
        </p>
      </header>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
        
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 border border-gray-700 rounded-lg">
            <Mail size={32} className="mx-auto text-red-500 mb-2"/>
            <p className="font-semibold text-white">Email Support</p>
            <p className="text-sm text-gray-400">support@matchzone.com</p>
          </div>
          <div className="p-4 border border-gray-700 rounded-lg">
            <Phone size={32} className="mx-auto text-red-500 mb-2"/>
            <p className="font-semibold text-white">Phone (General)</p>
            <p className="text-sm text-gray-400">+20 123 456 7890</p>
          </div>
          <div className="p-4 border border-gray-700 rounded-lg">
            <MapPin size={32} className="mx-auto text-red-500 mb-2"/>
            <p className="font-semibold text-white">Location</p>
            <p className="text-sm text-gray-400">Cairo, Egypt</p>
          </div>
        </div>

        <div className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            {/* Placeholder for Contact Form */}
            <div className="bg-gray-700 p-6 rounded-lg text-center text-gray-400">
                [Here you would integrate your actual contact form component]
                <p className="mt-2">Form Submission is required for full functionality.</p>
            </div>
        </div>
      </div>
    </div>
  );
}