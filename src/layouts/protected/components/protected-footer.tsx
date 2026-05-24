export default function ProtectedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t p-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
        <p>&copy; {currentYear} Park Clinic Admin Panel. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-600 transition">Support</a>
          <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}