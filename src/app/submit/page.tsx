import Header from '@/components/Header';
import SubmissionForm from '@/components/SubmissionForm'; // Will create this next

export default function SubmitPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Submit a New Tool</h1>
        <SubmissionForm />
      </main>
      {/* Optional Footer */}
    </div>
  );
}
