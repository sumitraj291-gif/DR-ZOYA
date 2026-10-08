import { useEffect } from 'react';

const SITE_URL = 'https://dnaclinicindia.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/dr_zoya_rana.webp`;

export const SEO = ({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData = null,
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title
      ? `${title} | Dr. Zoya DNA Clinic`
      : 'Dr. Zoya | Luxury Aesthetic Dermatology & Cosmetic Smile Studio';
    document.title = fullTitle;

    // Helper to create or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to create or update link tags
    const setLinkTag = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    // 2. Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');

    // 3. Canonical URL
    if (!noindex) {
      setLinkTag('canonical', canonicalUrl);
    } else {
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.remove();
    }

    // 4. OpenGraph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'DNA Dental, Skin & Hair Clinic');

    // 5. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 6. JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': ['MedicalBusiness', 'Dentist'],
      name: 'DNA Dental, Skin & Hair Clinic - Dr. Zoya',
      url: SITE_URL,
      telephone: '+91 63953 77355',
      email: 'dnadentalclinic3@gmail.com',
      image: `${SITE_URL}/images/dna_logo.webp`,
      sameAs: ['https://www.instagram.com/dnaclinicindia/'],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Rajpur Road / Ballupur Chowk',
          addressLocality: 'Dehradun',
          addressRegion: 'Uttarakhand',
          addressCountry: 'IN'
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Civil Lines',
          addressLocality: 'Muzaffarnagar',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN'
        }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00'
        }
      ],
      priceRange: '₹₹'
    };

    let scriptTag = document.getElementById('clinic-json-ld');
    if (noindex) {
      if (scriptTag) scriptTag.remove();
    } else {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'clinic-json-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(structuredData || defaultSchema);
    }

    return () => {
      // Clean up script on unmount if needed
    };
  }, [title, description, path, image, noindex, structuredData]);

  return null;
};
