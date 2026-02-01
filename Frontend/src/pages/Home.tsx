import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const [username, setUsername] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = username.trim().toLowerCase().replace(/\s+/g, '')
    if (slug) {
      navigate('/signup', { state: { suggestedUsername: slug } })
    } else {
      navigate('/signup')
    }
  }

  const handleStartWriting = () => {
    navigate('/signup')
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="bg-paper text-ink overflow-x-hidden flex flex-col min-h-screen selection:bg-primary selection:text-white">
      {/* Header */}
      <div className="w-full border-b border-ink/10 bg-paper sticky top-0 z-50">
        <div className="px-4 md:px-10 py-4 max-w-[1200px] mx-auto w-full">
          <header className="flex items-center justify-between whitespace-nowrap">
            <Link to="/" className="flex items-center gap-3 text-ink group cursor-pointer">
              <div className="size-8 flex items-center justify-center border border-primary text-primary bg-primary/5">
                <span className="material-symbols-outlined !text-[20px]">terminal</span>
              </div>
              <h2 className="text-ink text-xl font-bold tracking-tight">Onblogs</h2>
            </Link>
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
              <div className="flex items-center gap-8">
                <button type="button" onClick={() => scrollToSection('manifesto')} className="text-ink-light hover:text-primary text-sm font-medium transition-colors">Manifesto</button>
                <button type="button" onClick={() => scrollToSection('features')} className="text-ink-light hover:text-primary text-sm font-medium transition-colors">Features</button>
                <button type="button" onClick={() => scrollToSection('pricing')} className="text-ink-light hover:text-primary text-sm font-medium transition-colors">Pricing</button>
              </div>
              <button type="button" onClick={handleStartWriting} className="flex cursor-pointer items-center justify-center overflow-hidden rounded border border-primary bg-transparent hover:bg-primary hover:text-white transition-all h-9 px-5 text-primary text-sm font-bold tracking-wide uppercase">
                <span className="truncate">Start Writing</span>
              </button>
            </div>
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-ink p-2" aria-label="Toggle menu">
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </header>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-ink/10 flex flex-col gap-4">
              <button type="button" onClick={() => scrollToSection('manifesto')} className="text-left text-ink-light hover:text-primary text-sm font-medium">Manifesto</button>
              <button type="button" onClick={() => scrollToSection('features')} className="text-left text-ink-light hover:text-primary text-sm font-medium">Features</button>
              <button type="button" onClick={() => scrollToSection('pricing')} className="text-left text-ink-light hover:text-primary text-sm font-medium">Pricing</button>
              <button type="button" onClick={handleStartWriting} className="flex items-center justify-center rounded border border-primary bg-transparent hover:bg-primary hover:text-white h-9 px-5 text-primary text-sm font-bold uppercase w-fit">Start Writing</button>
            </div>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 w-full bg-paper relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="layout-content-container flex flex-col max-w-[960px] w-full z-10 gap-10">
          <div className="flex flex-col gap-6 text-center items-center">
            <h1 className="text-ink text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
              Blogging without<br />the <span className="text-primary italic font-serif">bullshit.</span>
            </h1>
            <h2 className="text-ink-light text-lg md:text-xl font-normal max-w-2xl leading-relaxed font-sans">
              No algorithms. No paywalls. No growth hacks.<br />Just words on a screen.
            </h2>
          </div>
          <form onSubmit={handleReserve} className="flex flex-col w-full max-w-[520px] mx-auto mt-6">
            <label htmlFor="username" className="flex flex-col w-full">
              <div className="flex w-full items-stretch h-14 md:h-16 shadow-[0_4px_0_0_rgba(26,26,26,1)] rounded-sm border border-ink">
                <div className="text-ink flex bg-paper items-center justify-center pl-4 rounded-l border-r border-ink">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <input
                  id="username"
                  type="text"
                  className="flex w-full min-w-0 flex-1 resize-none bg-surface text-ink focus:outline-0 focus:bg-white placeholder:text-gray-400 px-3 text-base md:text-lg font-mono"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="flex items-center justify-center bg-surface pr-2">
                  <button type="submit" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-primary hover:bg-[#b71c1c] transition-colors h-10 md:h-12 px-6 text-white text-sm md:text-base font-bold tracking-wide uppercase">
                    <span className="truncate">Reserve</span>
                  </button>
                </div>
              </div>
            </label>
            <p className="text-xs text-ink-light mt-4 text-center font-mono opacity-80">onblogs.com/yourname is free forever.</p>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-10 bg-white border-y border-ink/10" id="features">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/10 pb-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-ink text-4xl font-bold tracking-tight">The Vibe</h2>
              <p className="text-ink-light text-lg">We removed everything that isn&apos;t writing.</p>
            </div>
            <div className="text-primary font-mono text-sm opacity-80 bg-paper px-2 py-1 rounded border border-ink/10">
              &lt;system_status: optimized&gt;
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group flex flex-col gap-4 p-6 border border-ink/10 bg-paper hover:border-primary/50 transition-colors duration-300 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-ink/5 group-hover:bg-primary transition-colors" />
              <div className="size-12 rounded bg-white border border-ink/10 flex items-center justify-center group-hover:text-primary text-ink transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>visibility_off</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-ink text-xl font-bold">No Ads</h3>
                <p className="text-ink-light text-sm leading-relaxed font-sans">Your readers are here to read you, not to be sold as a product to advertisers.</p>
              </div>
            </div>
            <div className="group flex flex-col gap-4 p-6 border border-ink/10 bg-paper hover:border-primary/50 transition-colors duration-300 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-ink/5 group-hover:bg-primary transition-colors" />
              <div className="size-12 rounded bg-white border border-ink/10 flex items-center justify-center group-hover:text-primary text-ink transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>shield</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-ink text-xl font-bold">No Tracking</h3>
                <p className="text-ink-light text-sm leading-relaxed font-sans">We respect privacy. No cookies, no pixels, no data selling to third parties.</p>
              </div>
            </div>
            <div className="group flex flex-col gap-4 p-6 border border-ink/10 bg-paper hover:border-primary/50 transition-colors duration-300 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-ink/5 group-hover:bg-primary transition-colors" />
              <div className="size-12 rounded bg-white border border-ink/10 flex items-center justify-center group-hover:text-primary text-ink transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>bolt</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-ink text-xl font-bold">No Bloat</h3>
                <p className="text-ink-light text-sm leading-relaxed font-sans">Speed is a feature. Pages load instantly. HTML and CSS only. 100kb budget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Us vs Them table */}
      <section className="py-20 px-4 md:px-10 bg-paper" id="pricing">
        <div className="max-w-[960px] mx-auto w-full">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-ink mb-2">Us vs. Them</h2>
            <p className="text-ink-light font-serif italic">The choice is binary.</p>
          </div>
          <div className="w-full overflow-hidden border border-ink rounded-sm shadow-sm bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-ink text-white border-b border-ink">
                  <th className="px-6 py-4 text-left w-1/2 text-base font-bold uppercase tracking-wider border-r border-gray-700">What You Get</th>
                  <th className="px-6 py-4 text-left text-gray-400 w-1/2 text-base font-medium uppercase tracking-wider">What You Don&apos;t Get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                <tr className="hover:bg-paper transition-colors">
                  <td className="px-6 py-5 text-primary text-base font-bold border-r border-ink/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm font-bold">check</span> Full RSS Support
                  </td>
                  <td className="px-6 py-5 text-ink-light text-base font-sans">Algorithmic Feeds</td>
                </tr>
                <tr className="hover:bg-paper transition-colors">
                  <td className="px-6 py-5 text-primary text-base font-bold border-r border-ink/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm font-bold">check</span> Custom Domains
                  </td>
                  <td className="px-6 py-5 text-ink-light text-base font-sans">Paywalls</td>
                </tr>
                <tr className="hover:bg-paper transition-colors">
                  <td className="px-6 py-5 text-primary text-base font-bold border-r border-ink/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm font-bold">check</span> Data Export (JSON/MD)
                  </td>
                  <td className="px-6 py-5 text-ink-light text-base font-sans">Locked-in Content</td>
                </tr>
                <tr className="hover:bg-paper transition-colors">
                  <td className="px-6 py-5 text-primary text-base font-bold border-r border-ink/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm font-bold">check</span> Markdown Writing
                  </td>
                  <td className="px-6 py-5 text-ink-light text-base font-sans">Cluttered Editors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 px-4 bg-paper border-t border-ink/10 relative" id="manifesto">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" aria-hidden />
        <div className="max-w-[720px] mx-auto text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-6 border border-primary text-primary text-xs font-bold uppercase tracking-widest rounded-full bg-primary/5">Manifesto</div>
          <h2 className="text-ink text-3xl md:text-5xl font-display font-bold leading-tight mb-8">Why We&apos;re Here</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-ink text-lg md:text-xl leading-relaxed mb-6 font-serif">
              The internet is broken. It was meant to be a library, but it became a shopping mall. We built Onblogs to return to the roots of the web—a public utility for words, connection, and ideas, not engagement metrics.
            </p>
            <p className="text-ink-light text-lg leading-relaxed font-serif">
              We believe that writing should be permanent. We believe that your thoughts belong to you. We believe that simple is better than complex. Join us in rebuilding the quiet internet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-ink border-b border-ink bg-white text-center relative">
        <div className="absolute inset-x-0 top-1 h-px bg-ink/10" />
        <div className="absolute inset-x-0 bottom-1 h-px bg-ink/10" />
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-ink tracking-tighter">Join the Resistance.</h2>
          <p className="text-ink-light max-w-lg mx-auto font-sans">Start your blog today. No credit card required for the free tier.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button type="button" onClick={handleStartWriting} className="flex items-center justify-center h-12 px-8 bg-primary hover:bg-[#b71c1c] text-white font-bold text-lg rounded-sm shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all border border-ink">
              Start Writing Now
            </button>
            <button type="button" onClick={() => scrollToSection('manifesto')} className="flex items-center justify-center h-12 px-8 bg-transparent hover:bg-ink/5 text-ink font-bold text-lg rounded-sm border border-ink transition-colors">
              Read The Docs
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper pt-16 pb-8 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-ink">
                <div className="size-6 flex items-center justify-center border border-primary text-primary bg-primary/5">
                  <span className="material-symbols-outlined !text-[16px]">terminal</span>
                </div>
                <span className="font-bold text-lg">Onblogs</span>
              </div>
              <p className="text-ink-light text-sm font-sans">A public utility for words.<br />Built for the long haul.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-ink font-bold text-sm uppercase tracking-wider">Platform</h4>
              <Link to="/blogs" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Explore</Link>
              <button type="button" onClick={() => scrollToSection('pricing')} className="text-left text-ink-light hover:text-primary text-sm transition-colors font-sans">Pricing</button>
              <button type="button" onClick={() => scrollToSection('manifesto')} className="text-left text-ink-light hover:text-primary text-sm transition-colors font-sans">Manifesto</button>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-ink font-bold text-sm uppercase tracking-wider">Resources</h4>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Help Center</a>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">API Docs</a>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Status</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-ink font-bold text-sm uppercase tracking-wider">Legal</h4>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Privacy</a>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Terms</a>
              <a href="#" className="text-ink-light hover:text-primary text-sm transition-colors font-sans">Export Policy</a>
            </div>
          </div>
          <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ink-light opacity-60 text-xs font-sans">© 2023 Onblogs Inc. No rights reserved. Copyleft.</p>
            <div className="flex items-center gap-6">
              <a className="text-ink hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono uppercase" href="#"><span className="material-symbols-outlined !text-[16px]">rss_feed</span> RSS</a>
              <a className="text-ink hover:text-primary transition-colors flex items-center gap-2 text-xs font-mono uppercase" href="#"><span className="material-symbols-outlined !text-[16px]">code</span> GitHub</a>
              <div className="flex items-center gap-2 text-ink opacity-50 text-xs font-mono border-l border-ink/20 pl-6 cursor-not-allowed" title="Dark mode disabled in this theme">
                <span className="material-symbols-outlined !text-[16px]">light_mode</span> Paper Mode
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
