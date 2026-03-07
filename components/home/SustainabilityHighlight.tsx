import Link from 'next/link';
import { Leaf, Droplet, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SustainabilityHighlight() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sustainability & Social Responsibility
              </h2>
              <p className="text-lg opacity-90">
                At Amal Furnish, we believe in creating beautiful furniture while protecting our planet and supporting our community.
              </p>
            </div>

            <div className="space-y-4">
              {/* Sustainability Features */}
              {[
                {
                  icon: Leaf,
                  title: 'Responsible Sourcing',
                  description: 'All wood sourced from certified sustainable forests with replanting initiatives.',
                },
                {
                  icon: Droplet,
                  title: 'Eco-Friendly Process',
                  description: 'Water-based finishes and waste minimization throughout our production.',
                },
                {
                  icon: Recycle,
                  title: 'Community Impact',
                  description: 'Supporting local artisans and fair trade practices in our supply chain.',
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Link href="/sustainability">Learn More About Our Impact</Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block">
            <div
              className="w-full h-96 rounded-lg shadow-xl bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop")',
              }}
            />
          </div>
        </div>


      </div>
    </section>
  );
}
