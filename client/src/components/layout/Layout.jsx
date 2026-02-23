import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex h-[100vh] bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 h-[calc(100vh-64px)] overflow-y-scroll p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
