import { Navbar } from '../sections/Navbar';
import { SystemShop } from '../sections/SystemShop';
import { Footer } from '../sections/Footer';

export default function SystemShopPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar activeSection="shop" onSectionChange={() => {}} />
      <div className="pt-20">
        <SystemShop />
      </div>
      <Footer />
    </div>
  );
}
