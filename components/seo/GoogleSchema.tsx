import React from "react";

export default function GoogleSchema() {
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "SMAN 1 Ketapang Sampang",
    "description": "Sekolah penggerak yang berfokus pada pengembangan bakat, minat, dan karakter siswa di Kabupaten Sampang.",
    "url": "https://sman1ketapang.sch.id",
    "logo": "https://sman1ketapang.sch.id/login-logo.png",
    "image": "https://sman1ketapang.sch.id/login-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ledik, Rabiyan, Kec. Ketapang",
      "addressLocality": "Kabupaten Sampang",
      "addressRegion": "Jawa Timur",
      "postalCode": "69261",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.897615593101619",
      "longitude": "113.23827637483517"
    },
    "telephone": "(+62) 000-0000-0000",
    "email": "admin@sman1ketapang.sch.id",
    "sameAs": [
      "https://instagram.com/sman1_ketapang",
      "https://facebook.com/sman1ketapang",
      "https://youtube.com/sman1ketapang"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
    />
  );
}
