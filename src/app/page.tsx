import BannerImage from "@/components/BannerImage";
import Header from "@/components/Header";
import ToolList from "@/components/ToolList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <BannerImage />
      <main className="flex-grow">
        {/* ToolList contains its own container and padding */}
        <ToolList />
      </main>
      {/* Optional Footer can be added here */}
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 XR Tools Directory
      </footer> */}
    </div>
  );
}
