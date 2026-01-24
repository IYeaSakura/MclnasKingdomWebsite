import { HallOfFame } from '../sections/HallOfFame';
import { Footer } from '../sections/Footer';

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="pt-20">
        <HallOfFame />
      </div>
      <Footer />
    </div>
  );
}
