import { Rankings } from '../sections/Rankings';
import { Footer } from '../sections/Footer';

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="pt-20">
        <Rankings />
      </div>
      <Footer />
    </div>
  );
}
