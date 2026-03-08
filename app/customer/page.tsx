import { HeroSlider } from "@/components/home/hero-slider"
import FeaturedCollections from "@/components/home/featuredcollections"
import { CushionViewer } from "@/components/home/cushion-viewer"
import  ProductShowcase  from "@/components/home/product-showcase"
import { RecentProjects } from "@/components/home/recent-projects"
import SustainabilityHighlight from '@/components/home/SustainabilityHighlight';
import { PhotosSection } from "@/components/home/photos-section";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ProductShowcase />      
      <RecentProjects />
     
      <SustainabilityHighlight />
    </>
  )
}
