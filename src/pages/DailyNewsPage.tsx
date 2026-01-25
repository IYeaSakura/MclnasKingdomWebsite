import { DailyNews } from '../sections/DailyNews';
import { Footer } from '../sections/Footer';

export default function DailyNewsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <DailyNews />
      <Footer />
    </div>
  );
}
