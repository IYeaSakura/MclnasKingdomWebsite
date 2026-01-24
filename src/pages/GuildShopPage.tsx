import { Navbar } from '../sections/Navbar';
import { GuildShop } from '../sections/GuildShop';
import { Footer } from '../sections/Footer';

export default function GuildShopPage() {
  return (
    <div className="minmin-h-screen bg-[#f8f9fa]">
      <Navbar activeSection="guild" onSectionChange={() => {}} />
      <div className="pt-20">
        <GuildShop />
      </div>
      <Footer />
    </div>
  );
}
