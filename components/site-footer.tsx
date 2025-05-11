import Link from "next/link"
import { siteConfig } from "@/app/config"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[#d1dbff] bg-[#f8f9ff] py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-[#5d6bb0] mb-4">About</h3>
          <p className="text-[#6b7280] mb-4">
            Professional life coaching services to help you transform your life, achieve your goals, and unlock your
            full potential.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-[#5d6bb0] hover:text-[#4a5899] transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-[#5d6bb0] hover:text-[#4a5899] transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-[#5d6bb0] hover:text-[#4a5899] transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#5d6bb0] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Workshops
              </Link>
            </li>
            <li>
              <Link href="/book" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Book a Session
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#5d6bb0] mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/refund" className="text-[#6b7280] hover:text-[#5d6bb0] transition-colors">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#5d6bb0] mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Mail className="h-5 w-5 text-[#5d6bb0] mr-2 mt-0.5" />
              <span className="text-[#6b7280]">{siteConfig.email}</span>
            </li>
            <li className="flex items-start">
              <Phone className="h-5 w-5 text-[#5d6bb0] mr-2 mt-0.5" />
              <span className="text-[#6b7280]">{siteConfig.phone}</span>
            </li>
            <li className="flex items-start">
              <MapPin className="h-5 w-5 text-[#5d6bb0] mr-2 mt-0.5" />
              <span className="text-[#6b7280]">{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-[#d1dbff]">
        <p className="text-center text-sm text-[#6b7280]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
