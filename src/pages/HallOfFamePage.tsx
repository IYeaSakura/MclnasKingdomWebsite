import { Navbar } from '../sections/Navbar';
import { HallOfFame } from '../sections/HallOfFame';
import { Footer } from '../sections/Footer';

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar activeSection="fame" onSectionChange={() => {}} />
      <div className="pt-20">
        <HallOfFame />
      </div>
      <Footer />
    </div>
  );
}
