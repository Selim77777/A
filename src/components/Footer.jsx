export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} ESL Pathway. All rights reserved.</p>
      </div>
    </footer>
  );
}