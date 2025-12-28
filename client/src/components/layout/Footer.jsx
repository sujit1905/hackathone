// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-[#f3f4f6] w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] items-start">
          {/* Logo + tagline (same style as Navbar) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* <div className="flex items-center justify-center h-11 w-11 lg:h-12 lg:w-12 rounded-3xl bg-[#fff7e6] border border-[#ffd591] shadow-sm">
                <span className="text-xl lg:text-2xl font-bold text-[#fa8c16] leading-none">
                  C
                </span>
              </div> */}
              <span className="text-xl lg:text-2xl text-slate-900">
            CLG<span className="text-[#fa8c16]">EventHub</span>
          </span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              India&apos;s largest college event platform.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Explore
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-slate-900">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="hover:text-slate-900">
                  Organizations
                </Link>
              </li>
              <li>
                <Link to="/my-events" className="hover:text-slate-900">
                  My Participations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Contact
            </h3>
            <p className="text-sm text-slate-600">
              Email: eventapplyltd@gmail.com
            </p>
            <p className="text-sm text-slate-600">
              Phone: +91-7775841645
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Follow Us
            </h3>
            <div className="flex items-center gap-4 text-slate-600 text-sm">
              <a href="#" className="hover:text-slate-900">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-slate-900">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-slate-900">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-slate-900">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-[#e5e7eb]">
        <p className="text-center text-xs sm:text-sm text-slate-500 py-4">
          © 2025 DNICAEventHub, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
