export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen bg-gray-900 text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-red-500">Terms of Use</h1>
        <p className="text-sm mt-3 text-gray-400">
          Effective Date: December 12, 2025
        </p>
      </header>
      
      <article className="space-y-8 leading-relaxed text-gray-300">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">1. Acceptance of Terms</h2>
          <p>By accessing or using the MatchZone website, you agree to be bound by these Terms of Use and all terms incorporated by reference.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">2. User Conduct</h2>
          <p>You agree not to use the service for any illegal or unauthorized purpose, or to violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3 text-red-400">3. Intellectual Property</h2>
          <p>All content, trademarks, service marks, logos, and icons are the property of MatchZone or its licensors and are protected by copyright laws.</p>
        </section>
        
        <p className="text-sm pt-4 border-t border-gray-700 text-gray-400">
          Failure to comply with these terms may result in termination of your access to the service.
        </p>
      </article>
    </div>
  );
}