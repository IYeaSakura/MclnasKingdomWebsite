import { GuildShop } from '../sections/GuildShop';
import { Footer } from '../sections/Footer';

export default function GuildShopPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="pt-20">
        <GuildShop />
      </div>
      <Footer />
    </div>
  );
}
