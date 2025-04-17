import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">HM Wellness</h2>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Empowering individuals to achieve their full potential through professional coaching and wellness
              services.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Services</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/services#individual-coaching" className="text-sm text-gray-600 hover:text-gray-900">
                  Individual Coaching
                </Link>
              </li>
              <li>
                <Link href="/services#group-sessions" className="text-sm text-gray-600 hover:text-gray-900">
                  Group Sessions
                </Link>
              </li>
              <li>
                <Link href="/services#workshops" className="text-sm text-gray-600 hover:text-gray-900">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/services#consultations" className="text-sm text-gray-600 hover:text-gray-900">
                  Consultations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm text-gray-600 hover:text-gray-900">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} HM Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
