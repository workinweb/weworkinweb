import Logo from "../components/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-slate-400">
              Transforming ideas into exceptional web experiences. We don't just
              build websites; we craft digital solutions that work for your
              business.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>© {new Date().getFullYear()} WorkInWeb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
