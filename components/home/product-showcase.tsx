'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';

type FeatureProduct = {
  name: string;
  image: string;
  href: string;
  status: string;
};

type BestSellingItem = {
  name: string;
  image: string;
  href: string;
  priceLabel: string;
  stockLabel: string;
};

type LookCard = {
  title: string;
  image: string;
  href: string;
  size: 'small' | 'large';
  delay: string;
};

const PANTRY_PRODUCTS: FeatureProduct[] = [
  {
    name: 'Clemant Pantry',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=pantry&item=clemant-pantry',
    status: 'In stock',
  },
  {
    name: 'Cooper Pantry',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=pantry&item=cooper-pantry',
    status: 'In stock',
  },
  {
    name: 'Elora Pantry',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=pantry&item=elora-pantry',
    status: 'In stock',
  },
  {
    name: 'Urban Pantry',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=pantry&item=urban-pantry',
    status: 'Limited stock',
  },
];

const CUSTOMIZATION_PRODUCTS: FeatureProduct[] = [
  {
    name: 'Custom Wardrobe',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    href: '/customization?item=custom-wardrobe',
    status: 'Design available',
  },
  {
    name: 'Bespoke TV Unit',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/customization?item=bespoke-tv-unit',
    status: 'Design available',
  },
  {
    name: 'Tailored Kitchen Set',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    href: '/customization?item=tailored-kitchen-set',
    status: 'Consultation open',
  },
  {
    name: 'Custom Bedroom Set',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/customization?item=custom-bedroom-set',
    status: 'Consultation open',
  },
];

const BEST_SELLING_ITEMS: BestSellingItem[] = [
  {
    name: 'Amora Chair',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    href: '/products?item=amora-chair',
    priceLabel: 'Rs 62,500.00',
    stockLabel: 'In stock',
  },
  {
    name: 'Tidal Pantry',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    href: '/products?item=tidal-pantry',
    priceLabel: 'Rs 94,500.00',
    stockLabel: 'In stock',
  },
  {
    name: 'Liam Dining Table - Table Only',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/products?item=liam-dining-table',
    priceLabel: 'From: Rs 150,000.00',
    stockLabel: 'In stock',
  },
  {
    name: 'Yardly Bed - Bed Only',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/products?item=yardly-bed',
    priceLabel: 'From: Rs 195,000.00',
    stockLabel: 'In stock',
  },
  {
    name: 'Hudson Wardrobe',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    href: '/products?item=hudson-wardrobe',
    priceLabel: 'From: Rs 215,000.00',
    stockLabel: 'In stock',
  },
];

const SHOP_THE_LOOK_ITEMS: LookCard[] = [
  {
    title: 'Seating',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=seating',
    size: 'small',
    delay: '[animation-delay:100ms]',
  },
  {
    title: 'Sleeping & Resting',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=sleeping',
    size: 'small',
    delay: '[animation-delay:220ms]',
  },
  {
    title: 'Storage & Organization',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=storage',
    size: 'large',
    delay: '[animation-delay:140ms]',
  },
  {
    title: 'Tables & Surfaces',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=tables',
    size: 'small',
    delay: '[animation-delay:180ms]',
  },
  {
    title: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=office',
    size: 'small',
    delay: '[animation-delay:300ms]',
  },
  {
    title: 'Outdoor & Garden',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    href: '/products?category=outdoor',
    size: 'small',
    delay: '[animation-delay:360ms]',
  },
];
const SLIDER_AUTOPLAY_MS = 4500;

function ShopLookCard({ title, image, href, size, delay }: LookCard) {
  const heightClass =
    size === 'large' ? 'h-[360px] sm:h-[460px] lg:h-[540px]' : 'h-[230px] sm:h-[280px]';

  return (
    <article
      className={`group relative overflow-hidden rounded-sm shadow-lg bg-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-8 ${delay}`}
    >
      <div
        className={`${heightClass} bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105`}
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <div className="absolute top-0 left-0 bg-white/95 px-4 py-3 text-xs md:text-sm font-semibold text-foreground shadow-sm">
        {title}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] min-w-[160px]">
        <Button
          asChild
          className="w-full rounded-none bg-[#d6a833] hover:bg-[#bf9529] text-white font-bold tracking-wide text-[11px] md:text-xs"
        >
          <Link href={href}>SHOP THE LOOK</Link>
        </Button>
      </div>
    </article>
  );
}

export default function ProductShowcase() {
  const [activePantryPage, setActivePantryPage] = useState(0);
  const [activeCustomizationPage, setActiveCustomizationPage] = useState(0);
  const [bestSellingEmblaRef, bestSellingEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const pantryPages = [
    PANTRY_PRODUCTS.slice(0, 2),
    PANTRY_PRODUCTS.slice(2, 4),
  ];
  const customizationPages = [
    CUSTOMIZATION_PRODUCTS.slice(0, 2),
    CUSTOMIZATION_PRODUCTS.slice(2, 4),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePantryPage((prev) => (prev + 1) % pantryPages.length);
    }, SLIDER_AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [pantryPages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCustomizationPage((prev) => (prev + 1) % customizationPages.length);
    }, SLIDER_AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [customizationPages.length]);

  useEffect(() => {
    if (!bestSellingEmblaApi) return;

    const timer = setInterval(() => {
      bestSellingEmblaApi.scrollNext();
    }, SLIDER_AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [bestSellingEmblaApi]);

  const handleNextPantry = () => {
    setActivePantryPage((prev) => (prev + 1) % pantryPages.length);
  };

  const handlePreviousPantry = () => {
    setActivePantryPage((prev) => (prev - 1 + pantryPages.length) % pantryPages.length);
  };

  const handleNextCustomization = () => {
    setActiveCustomizationPage((prev) => (prev + 1) % customizationPages.length);
  };

  const handlePreviousCustomization = () => {
    setActiveCustomizationPage(
      (prev) => (prev - 1 + customizationPages.length) % customizationPages.length
    );
  };

  const handleNextBestSelling = () => {
    bestSellingEmblaApi?.scrollNext();
  };

  const handlePreviousBestSelling = () => {
    bestSellingEmblaApi?.scrollPrev();
  };

  const leftColumn = SHOP_THE_LOOK_ITEMS.slice(0, 2);
  const centerCard = SHOP_THE_LOOK_ITEMS[2];
  const rightColumn = SHOP_THE_LOOK_ITEMS.slice(3);

  return (
    <>
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#e7e1e6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:order-2 lg:col-span-4 space-y-6">
            <h2 className="text-4xl md:text-6xl leading-[1.05] text-foreground">
              <span className="block font-extrabold">Pantry</span>
              <span className="block font-medium">Furniture</span>
            </h2>

            <p className="max-w-md text-muted-foreground leading-relaxed text-base">
              Our kitchen and pantry furniture solutions are designed for everyday use, clean
              styling, and durable performance for modern homes.
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-none bg-[#d6a833] hover:bg-[#bf9529] text-white font-bold tracking-wide px-8"
            >
              <Link href="/products?category=pantry">EXPLORE ALL ITEMS</Link>
            </Button>
          </div>

          <div className="lg:order-1 lg:col-span-8 relative">
            <button
              onClick={handlePreviousPantry}
              className="hidden lg:inline-flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Previous pantry products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNextPantry}
              className="hidden lg:inline-flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Next pantry products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="lg:hidden flex items-center justify-end gap-2 mb-3">
              <button
                onClick={handlePreviousPantry}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Previous pantry products"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextPantry}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Next pantry products"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activePantryPage * 100}%)` }}
              >
                {pantryPages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {page.map((item, itemIndex) => (
                      <article
                        key={item.name}
                        className="group motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-8"
                        style={{ animationDelay: `${itemIndex * 120}ms` }}
                      >
                        <Link href={item.href} className="block">
                          <div
                            className="h-[260px] md:h-[340px] bg-cover bg-center shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          />
                        </Link>
                        <div className="pt-4">
                          <Link href={item.href} className="text-2xl font-semibold text-foreground hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full border border-muted-foreground/60" />
                            {item.status}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#ece6e9]">
        <div className="max-w-7xl mx-auto pb-12 md:pb-14">
          <div className="relative mb-7">
            <div className="h-px bg-border" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[2px] w-24 bg-[#d6a833]" />
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Best Selling Items
          </h3>

          <div className="relative">
            <button
              onClick={handlePreviousBestSelling}
              className="hidden lg:inline-flex absolute -left-5 top-[38%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Previous best selling items"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNextBestSelling}
              className="hidden lg:inline-flex absolute -right-5 top-[38%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Next best selling items"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="lg:hidden flex items-center justify-end gap-2 mb-3">
              <button
                onClick={handlePreviousBestSelling}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Previous best selling items"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextBestSelling}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Next best selling items"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden" ref={bestSellingEmblaRef}>
              <div className="flex -ml-5">
                {BEST_SELLING_ITEMS.map((item) => (
                  <article
                    key={item.name}
                    className="group pl-5 flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_20%]"
                  >
                    <Link href={item.href} className="block overflow-hidden border border-border bg-card">
                      <div
                        className="h-52 md:h-56 bg-cover bg-center shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                    </Link>

                    <div className="pt-3">
                      <Link
                        href={item.href}
                        className="text-lg font-semibold text-foreground hover:text-primary leading-snug"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-xl font-medium text-foreground">{item.priceLabel}</p>

                      <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full border border-muted-foreground/60" />
                        {item.stockLabel}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-4xl md:text-6xl leading-[1.05] text-foreground">
              <span className="block font-extrabold">Customization</span>
              <span className="block font-medium">Furniture</span>
            </h2>

            <p className="max-w-md text-muted-foreground leading-relaxed text-base">
              Personalize every detail from dimensions to finishes. Share your idea with us and
              get furniture built exactly for your room and lifestyle.
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-none bg-[#d6a833] hover:bg-[#bf9529] text-white font-bold tracking-wide px-8"
            >
              <Link href="/customization">START CUSTOMIZATION</Link>
            </Button>
          </div>

          <div className="lg:col-span-8 relative">
            <button
              onClick={handlePreviousCustomization}
              className="hidden lg:inline-flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Previous customization products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNextCustomization}
              className="hidden lg:inline-flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
              aria-label="Next customization products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="lg:hidden flex items-center justify-end gap-2 mb-3">
              <button
                onClick={handlePreviousCustomization}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Previous customization products"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextCustomization}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm transition-colors"
                aria-label="Next customization products"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeCustomizationPage * 100}%)` }}
              >
                {customizationPages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {page.map((item, itemIndex) => (
                      <article
                        key={item.name}
                        className="group motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-8"
                        style={{ animationDelay: `${itemIndex * 120}ms` }}
                      >
                        <Link href={item.href} className="block">
                          <div
                            className="h-[260px] md:h-[340px] bg-cover bg-center shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          />
                        </Link>
                        <div className="pt-4">
                          <Link href={item.href} className="text-2xl font-semibold text-foreground hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full border border-muted-foreground/60" />
                            {item.status}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl leading-tight text-foreground">
              <span className="font-extrabold">Shop</span>{' '}
              <span className="font-medium">the Look</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
            <div className="order-2 lg:order-1 lg:col-span-3 grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {leftColumn.map((item) => (
                <ShopLookCard key={item.title} {...item} />
              ))}
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              {centerCard && <ShopLookCard {...centerCard} />}
            </div>

            <div className="order-3 lg:col-span-3 grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {rightColumn.map((item) => (
                <ShopLookCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Handcrafted Elegance',
    subtitle: 'Premium furniture crafted with passion and precision',
    image: '/123.png',
    cta: 'Explore Collection',
  },
  {
    id: 2,
    title: 'Custom Design Solutions',
    subtitle: 'Create your perfect furniture piece tailored to your needs',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=600&fit=crop',
    cta: 'Customize Now',
  },
  {
    id: 3,
    title: 'Sustainable Quality',
    subtitle: 'Responsibly sourced materials for lasting comfort',
    image: 'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&h=600&fit=crop',
    cta: 'Learn More',
  },
];
