import BestSelling from './BestSelling'
import HeroSection from './HeroSection'
import LimitedTimeDeal from './LimitedTimeDeal'
import StartExpolingNow from './StartExpolingNow'
import TrendingProducts from './TrendingProducts'
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrendingProducts />
        <BestSelling />
      <StartExpolingNow />
    
      {/* <LimitedTimeDeal /> */}
    </main>
  )
}
