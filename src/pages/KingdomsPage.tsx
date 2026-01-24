import { Navbar } from '../sections/Navbar';
import { Kingdoms } from '../sections/Kingdoms';
import { Footer } from '../sections/Footer';

export default function KingdomsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar activeSection="kingdoms" onSectionChange={() => {}} />
      <div className="pt-20">
        <Kingdoms />
      </div>
      <Footer />
    </div>
  );
}
