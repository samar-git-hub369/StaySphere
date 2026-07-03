import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border-div)] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--color-primary)] p-1.5 rounded-lg flex items-center justify-center">
                 <Building2 className="text-[var(--color-accent-gold)] h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-[var(--color-primary)]">StaySphere</span>
            </div>
            <p className="text-sm text-[var(--color-text-sec)]">
              Experience the world's most premium stays with uncompromised quality and service.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[var(--color-text-main)] mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-sec)]">
              <li><a href="#" className="hover:text-[var(--color-primary)]">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Careers</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-[var(--color-text-main)] mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-sec)]">
              <li><a href="#" className="hover:text-[var(--color-primary)]">Help Center</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Safety Information</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-[var(--color-text-main)] mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-sec)]">
              <li><a href="#" className="hover:text-[var(--color-primary)]">List your property</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Host Resources</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)]">Community Forum</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--color-border-div)] flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} StaySphere, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--color-primary)]">Privacy</a>
            <a href="#" className="hover:text-[var(--color-primary)]">Terms</a>
            <a href="#" className="hover:text-[var(--color-primary)]">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
