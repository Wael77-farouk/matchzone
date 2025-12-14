
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen bg-gray-900 text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-red-500">Privacy Policy</h1>
        <p className="text-sm mt-3 text-gray-400">
          Last Updated: December 12, 2025
        </p>
      </header>
      
      <article className="space-y-8 leading-relaxed text-gray-300">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, subscribe to a newsletter, or participate in interactive features.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">2. How We Use Your Information</h2>
          <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of MatchZone, to analyze and improve our service, and to communicate with you.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">3. Data Security</h2>
          <p>We take reasonable measures to protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever fully secure.</p>
        </section>
        
        <p className="text-sm pt-4 border-t border-gray-700 text-gray-400">
          For any questions regarding this policy, please contact us through the methods listed on our Contact Page.
        </p>
      </article>
    </div>
  );
}