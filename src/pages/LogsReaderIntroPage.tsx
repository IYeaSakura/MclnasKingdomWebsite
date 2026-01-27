import { LogsReaderIntro } from '../sections/LogsReaderIntro';
import { Footer } from '../sections/Footer';

export default function LogsReaderIntroPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="pt-20">
        <LogsReaderIntro />
      </div>
      <Footer />
    </div>
  );
}
