import { BRAND } from "../domain/menu";

/**
 * Datos estructurados schema.org (LocalBusiness / FoodEstablishment) para SEO local.
 * Con el pre-render del build, este script queda en el HTML estático.
 */
const datos = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: BRAND.nombre,
  description: BRAND.tagline,
  url: BRAND.siteUrl,
  image: `${BRAND.siteUrl}/og-cup.png`,
  telephone: BRAND.telefonoDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 10 N18-5",
    addressLocality: "Girardota",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  areaServed: {
    "@type": "City",
    name: "Girardota",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "14:00",
    closes: "20:00",
  },
  servesCuisine: "Postres",
  priceRange: "$",
  sameAs: [BRAND.instagramUrl],
} as const;

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
