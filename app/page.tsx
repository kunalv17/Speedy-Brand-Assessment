import SectionBody from "./components/SectionBody";
import SectionHeaderList from "./components/SectionHeaderList";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-screen p-6 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#303030]">Categories</h1>
      </div>
      <section>
        <SectionHeaderList />
        <SectionBody />
      </section>
    </main>
  );
}
