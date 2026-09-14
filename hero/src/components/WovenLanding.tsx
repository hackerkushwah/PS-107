import React, { useState } from 'react';
import { CinematicThemeToggler } from '@/components/ui/cinematic-theme-toggler';

interface WovenLandingProps {
  onEnterApp?: (userEmail?: string, targetTab?: string) => void;
  onGetStarted: (targetTab?: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const WovenLanding: React.FC<WovenLandingProps> = ({
  onGetStarted,
  language,
  setLanguage,
  isDark,
  onToggleTheme,
}) => {
  const isHi = language === 'hi';
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="heritage-landing-container">
      {/* Fixed Full-Bleed Video Background Canvas */}
      <div className="heritage-bg-media" aria-hidden="true">
        <video
          className="heritage-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4"
            type="video/mp4"
          />
        </video>
        <div className="heritage-bg-overlay" />
      </div>

      {/* ─── STICKY HERITAGE TOP NAVIGATION BAR ───────────────────────── */}
      <header className="heritage-navbar">
        <div className="heritage-nav-inner">
          {/* Brand Logo & Name */}
          <div className="heritage-nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg className="heritage-nav-brand-mark" viewBox="0 0 96 120" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <ellipse cx="48" cy="60" rx="45" ry="57" />
              <path d="M48 88V46" strokeLinecap="round" />
              <path d="M48 58c-8-2-14-8-16-16 9 0 15 5 16 16Zm0 0c8-2 14-8 16-16-9 0-15 5-16 16Z" />
              <path d="M48 74c-9-2-15-8-17-17 10 0 16 6 17 17Zm0 0c9-2 15-8 17-17-10 0-16 6-17 17Z" />
              <path d="M48 46c-6-3-9-9-8-16 6 3 9 9 8 16Zm0 0c6-3 9-9 8-16-6 3-9 9-8 16Z" />
              <path d="M30 44c-5 1-9-1-12-5 5-2 9-1 12 5Zm36 0c5 1 9-1 12-5-5-2-9-1-12 5Z" />
            </svg>
            <div>
              <span className="heritage-nav-brand-title">{isHi ? 'मानकसेतु' : 'ManakSetu'}</span>
              <span className="heritage-nav-brand-tag">{isHi ? 'बीआईएस राष्ट्रीय मानक' : 'BIS National Standards'}</span>
            </div>
          </div>

          {/* Navigation Links with Dropdowns */}
          <nav className="heritage-nav-menu" aria-label="Main Navigation">
            {/* Standards Dropdown */}
            <div
              className="heritage-nav-item"
              onMouseEnter={() => setActiveDropdown('standards')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="heritage-nav-link"
                onClick={() => scrollToSection('standards-section')}
              >
                <span>{isHi ? 'मानक अन्वेषण' : 'Standards'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {activeDropdown === 'standards' && (
                <div className="heritage-dropdown-menu">
                  <button type="button" onClick={() => onGetStarted('standards')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'संपूर्ण मानक संग्रह' : 'Full Collection (22,000+)'}</strong>
                    <span>{isHi ? 'सभी भारतीय मानकों का अन्वेषण करें' : 'Browse full catalogue of IS standards'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('standards')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'अनिवार्य क्यूसीओ आदेश' : 'Mandatory QCOs'}</strong>
                    <span>{isHi ? 'राजपत्र अधिसूचित अनिवार्य उत्पाद' : 'Gazette notified mandatory compliance'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('spec')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'उत्पाद विनिर्देश विश्लेषक' : 'Spec Analyzer'}</strong>
                    <span>{isHi ? 'एआई उत्पाद विनिर्देश जांच' : 'AI feasibility and gap analysis'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('verify')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'स्वर्ण हॉलमार्किंग (HUID)' : 'Gold Hallmarking'}</strong>
                    <span>{isHi ? '6-अंकीय HUID सत्यापन' : 'Verify authentic hallmark jewelry'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Heritage Dropdown */}
            <div
              className="heritage-nav-item"
              onMouseEnter={() => setActiveDropdown('heritage')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="heritage-nav-link"
                onClick={() => scrollToSection('heritage-section')}
              >
                <span>{isHi ? 'विरासत एवं अधिनियम' : 'Heritage'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {activeDropdown === 'heritage' && (
                <div className="heritage-dropdown-menu">
                  <button type="button" onClick={() => onGetStarted('home')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'बीआईएस अधिनियम 2016' : 'BIS Act 2016'}</strong>
                    <span>{isHi ? 'संसदीय वैधानिक ढांचा' : 'Parliamentary statutory governance'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('home')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'राष्ट्रीय मानकीकरण नींव' : 'National Roots'}</strong>
                    <span>{isHi ? '1947 से गुणवत्ता की यात्रा' : 'Journey of Indian quality since 1947'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('labs')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'प्रयोगशाला नेटवर्क' : 'Lab Network'}</strong>
                    <span>{isHi ? 'एनबीएल मान्यता प्राप्त प्रयोगशालाएं' : 'Empaneled NABL testing facilities'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="heritage-nav-item"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="heritage-nav-link"
                onClick={() => scrollToSection('services-section')}
              >
                <span>{isHi ? 'सेवाएं एवं सहायता' : 'Care & Service'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {activeDropdown === 'services' && (
                <div className="heritage-dropdown-menu">
                  <button type="button" onClick={() => onGetStarted('chat')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'मानकसेतु एआई चैट' : 'ManakSetu AI Assistant'}</strong>
                    <span>{isHi ? 'प्रामाणिक बीआईएस विशेषज्ञ वार्ता' : 'Authoritative dialogue grounded in Gazette'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('verify')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'लाइसेंस सत्यापन' : 'Verify License (CML)'}</strong>
                    <span>{isHi ? 'निर्माता सीएम/एल नंबर की पुष्टि करें' : 'Confirm valid manufacturer license'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('calculator')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'शुल्क कैलकुलेटर' : 'Fee Calculator'}</strong>
                    <span>{isHi ? 'एमएसएमई 50% रियायत सहित' : 'Estimate license and marking fees'}</span>
                  </button>
                  <button type="button" onClick={() => onGetStarted('labs')} className="heritage-dropdown-item">
                    <strong>{isHi ? 'लैब खोजक' : 'Lab Locator'}</strong>
                    <span>{isHi ? 'निकटतम उत्पाद परीक्षण लैब' : 'Find certified testing labs across India'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Section Jump: Gazette */}
            <button
              type="button"
              className="heritage-nav-link-flat"
              onClick={() => scrollToSection('newsletter-section')}
            >
              {isHi ? 'राजपत्र बुलेटिन' : 'The Letter'}
            </button>
          </nav>

          {/* Right Action Tools: Language + Dark Mode + Launch Portal */}
          <div className="heritage-nav-actions">
            <button
              type="button"
              onClick={() => setLanguage(isHi ? 'en' : 'hi')}
              className="heritage-nav-icon-btn"
              title="Toggle Language"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{isHi ? 'English' : 'हिंदी'}</span>
            </button>

            <CinematicThemeToggler
              isDark={isDark}
              onToggle={onToggleTheme}
              className="border border-[var(--ink)]/30 rounded-full"
            />

            <button
              type="button"
              onClick={() => onGetStarted('home')}
              className="heritage-launch-btn"
            >
              <span>{isHi ? 'पोर्टल खोलें' : 'Launch Portal'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── SCROLLABLE PAGE CONTENT BODY ─────────────────────────────── */}
      <main className="heritage-main-content">
        {/* HERO INTRO SECTION */}
        <section className="heritage-hero-section">
          <div className="heritage-hero-lockup">
            <svg className="brand-mark-hero" viewBox="0 0 96 120" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <ellipse cx="48" cy="60" rx="45" ry="57" />
              <path d="M48 88V46" strokeLinecap="round" />
              <path d="M48 58c-8-2-14-8-16-16 9 0 15 5 16 16Zm0 0c8-2 14-8 16-16-9 0-15 5-16 16Z" />
              <path d="M48 74c-9-2-15-8-17-17 10 0 16 6 17 17Zm0 0c9-2 15-8 17-17-10 0-16 6-17 17Z" />
              <path d="M48 46c-6-3-9-9-8-16 6 3 9 9 8 16Zm0 0c6-3 9-9 8-16-6 3-9 9-8 16Z" />
              <path d="M30 44c-5 1-9-1-12-5 5-2 9-1 12 5Zm36 0c5 1 9-1 12-5-5-2-9-1-12 5Z" />
            </svg>
            <h1 className="heritage-hero-title">
              {isHi ? 'मानकसेतु' : 'ManakSetu'}
            </h1>
            <p className="heritage-hero-subtitle">
              {isHi
                ? 'भारतीय मानक ब्यूरो (BIS) एवं गुणवत्ता नियंत्रण आदेश (QCO) हेतु राष्ट्रीय कृत्रिम बुद्धिमत्ता सहायक'
                : 'National AI Intelligence for Bureau of Indian Standards, QCOs & Industry Certification'}
            </p>
            <div className="heritage-hero-buttons">
              <button
                type="button"
                onClick={() => onGetStarted('chat')}
                className="heritage-primary-btn"
              >
                <span>{isHi ? 'एआई सहायक से पूछें →' : 'Consult ManakSetu AI →'}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('standards-section')}
                className="heritage-secondary-btn"
              >
                <span>{isHi ? 'मानक अन्वेषण करें ↓' : 'Explore Standards ↓'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 1: STANDARDS ECOSYSTEM */}
        <section id="standards-section" className="heritage-content-section">
          <div className="heritage-section-header">
            <span className="heritage-section-tag">{isHi ? 'अध्याय 01' : 'Chapter 01'}</span>
            <h2 className="heritage-section-title">{isHi ? 'राष्ट्रीय मानक संग्रह' : 'Standards Ecosystem'}</h2>
            <p className="heritage-section-desc">
              {isHi
                ? '22,000+ से अधिक सक्रिय भारतीय मानक एवं अनिवार्य गुणवत्ता नियंत्रण आदेश (QCOs)'
                : 'Over 22,000 active Indian standards, gazetted QCO orders, and technical conformity procedures.'}
            </p>
          </div>

          <div className="heritage-cards-grid">
            <div className="heritage-card" onClick={() => onGetStarted('standards')}>
              <div className="heritage-card-badge">ISI Mark</div>
              <h3>{isHi ? 'योजना I: आईएसआई मार्क' : 'Scheme I (ISI Mark)'}</h3>
              <p>{isHi ? 'घरेलू उपकरणों, सीमेंट, इस्पात और हेलमेट के लिए अनिवार्य उत्पाद प्रमाणन।' : 'Mandatory product certification for appliances, helmets, steel, and cement.'}</p>
              <span className="heritage-card-action">{isHi ? 'विस्तार से देखें →' : 'Explore Scheme →'}</span>
            </div>

            <div className="heritage-card" onClick={() => onGetStarted('standards')}>
              <div className="heritage-card-badge">CRS Mark</div>
              <h3>{isHi ? 'योजना II: अनिवार्य पंजीकरण (CRS)' : 'Scheme II (CRS)'}</h3>
              <p>{isHi ? 'इलेक्ट्रॉनिक्स, आईटी हार्डवेयर, सोलर मॉड्यूल और लिथियम-आयन बैटरी के लिए।' : 'Compulsory registration for IT goods, power banks, and solar PV modules.'}</p>
              <span className="heritage-card-action">{isHi ? 'विस्तार से देखें →' : 'Explore Scheme →'}</span>
            </div>

            <div className="heritage-card" onClick={() => onGetStarted('verify')}>
              <div className="heritage-card-badge">HUID</div>
              <h3>{isHi ? 'स्वर्ण हॉलमार्किंग' : 'Gold Hallmarking'}</h3>
              <p>{isHi ? '6-अंकीय अल्फान्यूमेरिक HUID के साथ उपभोक्ता शुद्धता और विश्वसनीयता की गारंटी।' : 'Consumer authenticity guarantee via unique 6-digit alphanumeric HUID.'}</p>
              <span className="heritage-card-action">{isHi ? 'एचयूआईडी जांचें →' : 'Verify HUID →'}</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: HERITAGE & AUTHORITY */}
        <section id="heritage-section" className="heritage-content-section">
          <div className="heritage-section-header">
            <span className="heritage-section-tag">{isHi ? 'अध्याय 02' : 'Chapter 02'}</span>
            <h2 className="heritage-section-title">{isHi ? 'हमारी विरासत एवं वैधानिक आधार' : 'Our Roots & Authority'}</h2>
            <p className="heritage-section-desc">
              {isHi
                ? 'भारतीय मानक ब्यूरो अधिनियम, 2016 के तहत संचालित उपभोक्ता सुरक्षा एवं गुणवत्ता का राष्ट्रीय प्रतीक'
                : 'Statutory excellence grounded in the Bureau of Indian Standards Act, 2016 and Gazette of India.'}
            </p>
          </div>

          <div className="heritage-two-col">
            <div className="heritage-story-box">
              <h3>{isHi ? 'भारतीय मानक ब्यूरो अधिनियम, 2016' : 'The BIS Act 2016'}</h3>
              <p>
                {isHi
                  ? 'बीआईएस अधिनियम 2016 भारतीय मानक ब्यूरो को भारत के राष्ट्रीय मानक निकाय के रूप में स्थापित करता है। यह केंद्र सरकार को सार्वजनिक हित, मानव सुरक्षा और पर्यावरण संरक्षण में वस्तुओं के लिए अनिवार्य गुणवत्ता नियंत्रण आदेश (QCO) जारी करने का अधिकार देता है।'
                  : 'The BIS Act 2016 establishes the Bureau of Indian Standards as the National Standards Body of India. Under Section 16, the Central Government mandates conformity to Indian Standards to protect consumer health, safety, and national industrial quality.'}
              </p>
              <ul className="heritage-check-list">
                <li>✓ {isHi ? 'धारा 16: अनिवार्य क्यूसीओ अनुपालन' : 'Section 16: Mandatory QCO Compliance Orders'}</li>
                <li>✓ {isHi ? 'धारा 29: नकली मार्क पर सख्त दंडात्मक प्रावधान' : 'Section 29: Strict Penalties on Counterfeit Markings'}</li>
                <li>✓ {isHi ? 'उद्यमियों एवं एमएसएमई के लिए 50% शुल्क रियायत' : '50% Marking Fee Concessions for Micro Enterprises'}</li>
              </ul>
            </div>

            <div className="heritage-story-box">
              <h3>{isHi ? 'राष्ट्रीय संपर्क केंद्र' : 'National Contact Hub'}</h3>
              <ul className="heritage-contact-detail-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <div>
                    <strong>{isHi ? 'आधिकारिक ईमेल' : 'Official Email'}</strong>
                    <a href="mailto:info@bis.gov.in">info@bis.gov.in</a>
                  </div>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                  <div>
                    <strong>{isHi ? 'हेल्पलाइन संपर्क' : 'Toll-Free Helpline'}</strong>
                    <a href="tel:+911123230131">+91 11 2323 0131 / 1915</a>
                  </div>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  <div>
                    <strong>{isHi ? 'मुख्यालय' : 'Headquarters'}</strong>
                    <span>{isHi ? 'मानक भवन, 9 बहादुर शाह जफर मार्ग, नई दिल्ली 110002' : 'Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: CARE & SERVICE */}
        <section id="services-section" className="heritage-content-section">
          <div className="heritage-section-header">
            <span className="heritage-section-tag">{isHi ? 'अध्याय 03' : 'Chapter 03'}</span>
            <h2 className="heritage-section-title">{isHi ? 'नागरिक एवं उद्योग सेवाएं' : 'Care & Digital Services'}</h2>
            <p className="heritage-section-desc">
              {isHi
                ? 'निर्माताओं, आयातकों, प्रयोगशालाओं एवं उपभोक्ताओं के लिए एकीकृत डिजिटल समाधान'
                : 'Integrated tools designed to make standards accessible, transparent, and easy to navigate.'}
            </p>
          </div>

          <div className="heritage-tools-grid">
            <div className="heritage-tool-card" onClick={() => onGetStarted('chat')}>
              <div className="heritage-tool-icon">💬</div>
              <h4>{isHi ? 'मानकसेतु एआई चैट' : 'Conversational AI'}</h4>
              <p>{isHi ? 'प्राकृतिक बातचीत में मानकों, परीक्षण और प्रक्रियाओं की सटीक जानकारी।' : 'Instant answers to ambiguous standards queries with verified IS citations.'}</p>
            </div>

            <div className="heritage-tool-card" onClick={() => onGetStarted('spec')}>
              <div className="heritage-tool-icon">🔍</div>
              <h4>{isHi ? 'विनिर्देश विश्लेषक' : 'Spec Analyzer'}</h4>
              <p>{isHi ? 'अपने उत्पाद विवरण को अपलोड करें और प्रासंगिक मानकों का पता लगाएं।' : 'Input raw product specs to discover applicable IS codes and gap metrics.'}</p>
            </div>

            <div className="heritage-tool-card" onClick={() => onGetStarted('calculator')}>
              <div className="heritage-tool-icon">🧮</div>
              <h4>{isHi ? 'लाइसेंस शुल्क गणना' : 'Fee Estimator'}</h4>
              <p>{isHi ? 'आवेदन, निरीक्षण एवं वार्षिक अंकन शुल्क की अग्रिम गणना करें।' : 'Calculate application, audit, and annual marking fees with MSME discounts.'}</p>
            </div>

            <div className="heritage-tool-card" onClick={() => onGetStarted('labs')}>
              <div className="heritage-tool-icon">🧪</div>
              <h4>{isHi ? 'प्रयोगशाला खोजक' : 'Lab Finder'}</h4>
              <p>{isHi ? 'भारत भर में अपने उत्पाद हेतु अधिकृत परीक्षण प्रयोगशालाएं खोजें।' : 'Locate certified NABL & BIS test labs near your manufacturing facility.'}</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE LETTER / GAZETTE SUBSCRIBER */}
        <section id="newsletter-section" className="heritage-content-section">
          <div className="heritage-newsletter-box">
            <span className="heritage-section-tag">{isHi ? 'राजपत्र बुलेटिन' : 'The Letter'}</span>
            <h2>{isHi ? 'नवीनतम राजपत्र क्यूसीओ सूचनाएं प्राप्त करें' : 'Stay Ahead of National Quality Orders'}</h2>
            <p>
              {isHi
                ? 'जब भी केंद्र सरकार कोई नया अनिवार्य क्यूसीओ या मसौदा मानक प्रकाशित करती है, तुरंत सूचना प्राप्त करें।'
                : 'Sign up for timely notices on newly gazetted QCO deadlines, draft standards open for public review, and MSME subsidy updates.'}
            </p>

            {subscribed ? (
              <div className="subscribe-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{isHi ? 'धन्यवाद! आप सफलतापूर्वक पंजीकृत हो गए हैं।' : 'Subscribed! You will receive new QCO alerts.'}</span>
              </div>
            ) : (
              <form className="subscribe" onSubmit={handleSubscribe}>
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder={isHi ? 'अपना कार्य ईमेल दर्ज करें' : 'Leave your email'}
                  autoComplete="email"
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>
            )}

            <div className="heritage-cta-final">
              <button
                type="button"
                onClick={() => onGetStarted('home')}
                className="heritage-launch-large-btn"
              >
                <span>{isHi ? 'मानकसेतु पोर्टल में प्रवेश करें →' : 'Enter ManakSetu Portal →'}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── HERITAGE FOOTER ─────────────────────────────────────────── */}
      <footer className="heritage-footer">
        <div className="heritage-footer-inner">
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <nav className="legal" aria-label="Legal">
            <button type="button" onClick={() => onGetStarted('standards')} className="legal-btn">
              {isHi ? 'गोपनीयता सूचना' : 'Privacy Notice'}
            </button>
            <button type="button" onClick={() => onGetStarted('standards')} className="legal-btn">
              {isHi ? 'नियम व शर्तें' : 'Terms & Policies'}
            </button>
            <button type="button" onClick={() => onGetStarted('standards')} className="legal-btn">
              {isHi ? 'कुकी नीति' : 'Cookie Notice'}
            </button>
            <span className="legal-copyright">
              © {new Date().getFullYear()} ManakSetu • Bureau of Indian Standards Act 2016
            </span>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default WovenLanding;
