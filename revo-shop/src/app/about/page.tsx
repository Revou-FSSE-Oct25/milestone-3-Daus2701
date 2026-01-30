
import AboutContent from "./components/about/AboutContent";

export const metadata = {
  title: "About | Revo Shop",
};

export const dynamic = "force-static"; // SSG

export default function AboutPage() {
  return (
    <main className="p-6 max-w-3xl">
      <AboutContent />
    </main>
  );
}