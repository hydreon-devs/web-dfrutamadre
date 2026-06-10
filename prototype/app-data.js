/* ============================================================
   D'FRUTA MADRE — DATOS DEL MENÚ
   Expuesto en window.MENU / window.fmt
   ============================================================ */
(function () {
  // Formato de precio colombiano: 15000 -> "$15.000"
  const fmt = (n) =>
    '$' + Number(n).toLocaleString('es-CO', { maximumFractionDigits: 0 });

  const BRAND = {
    name: "D'Fruta Madre",
    tagline: 'Fresas con crema a domicilio en Girardota',
    instagram: 'fresas.de.girardota',
    instagramUrl: 'https://instagram.com/fresas.de.girardota',
    phoneDisplay: '+57 300 841 53 68',
    phoneIntl: '573008415368',
    horario: 'Martes a Domingo · 2:00 – 8:00 PM',
    cobertura: 'Cobertura solo en Girardota',
  };

  // --- Armador: fresas con crema ---
  const SIZES = [
    { id: 'p', name: 'Pequeño', oz: '12 oz', price: 15000, scale: 0.78 },
    { id: 'm', name: 'Mediano', oz: '16 oz', price: 18000, scale: 0.92 },
    { id: 'g', name: 'Grande',  oz: '24 oz', price: 25000, scale: 1.10 },
  ];

  const SALSAS = [
    { id: 'lecherita', name: 'Lecherita' },
    { id: 'arequipe',  name: 'Arequipe' },
    { id: 'chocolate', name: 'Chocolate' },
  ];

  const TOPPINGS_CLASICOS = [
    'Galleta de Mantequilla', 'Galleta Waffer', 'Masmelos',
    'Mermelada de Fresa', 'Chispitas de Chocolate', 'Chispitas de Colores',
    'Gelatina', 'Oreo', 'Milo', 'Zucaritas', 'Maní', 'Merenguitos',
  ].map((name, i) => ({ id: 'c' + i, name, price: 3000, tier: 'clasico' }));

  const TOPPINGS_PREMIUM = [
    'Queso', 'Durazno', 'Chocorramito', 'Gansito',
    'Pingüino', 'Helado', 'Porción de Fresa',
  ].map((name, i) => ({ id: 'p' + i, name, price: 3500, tier: 'premium' }));

  const TOPPING_PRICE = { clasico: 3000, premium: 3500 };

  // --- Otros productos del menú ---
  const ESPECIALES = [
    {
      id: 'merengon',
      name: "Merengón D'Fruta Madre",
      desc: 'Crema de la casa, fresa, durazno, mermelada de fresa y merengue.',
      img: 'assets/merengon.png',
      sizes: [{ label: 'Porción', price: 15000 }],
      tag: 'La especialidad',
    },
    {
      id: 'oblea',
      name: "Oblea pa' antojarse",
      desc: 'Crema de la casa, arequipe, mermelada de fresa, queso, oblea + topping clásico.',
      img: 'assets/oblea.png',
      sizes: [
        { label: 'Individual', price: 8000 },
        { label: 'Con queso o helado', price: 15000 },
      ],
    },
    {
      id: 'salpiconada',
      name: 'Salpiconada',
      desc: 'Lecherita, jugo de frutas y una mezcla de piña, mango y papaya.',
      img: 'assets/cup-salpiconada.png',
      sizes: [
        { label: '12 oz', price: 8000 },
        { label: '16 oz', price: 12000 },
      ],
    },
    {
      id: 'duraznos',
      name: 'Duraznos con crema',
      desc: 'Duraznos en almíbar bañados en crema de la casa.',
      img: 'assets/cup-chocolate.png',
      sizes: [
        { label: '16 oz', price: 18000 },
        { label: '24 oz', price: 22000 },
      ],
    },
  ];

  const OTROS = [
    { name: 'Chococono', price: 4000 },
    { name: 'Mermelada de Fresa · 24 oz', price: 16000 },
    { name: 'Vaso de Crema · 12 oz', price: 15000 },
    { name: 'Botella de Agua · 300 ml', price: 1000 },
  ];

  // --- Prueba social (reseñas de ejemplo — reemplazar luego) ---
  const RESENAS = [
    { name: 'Laura M.', meta: 'Barrio El Llano', stars: 5, text: 'Las mejores de Girardota 🍓 pedí las grandes con oreo y gansito y llegaron divinas. Súper cumplidos con el domicilio.' },
    { name: 'Andrés P.', meta: 'Cliente frecuente', stars: 5, text: 'El merengón es otro nivel. Ya es plan fijo de los domingos en familia.' },
    { name: 'Daniela R.', meta: 'Parque principal', stars: 5, text: 'Me encanta poder armarlas a mi gusto. La crema es bien casera, se nota el cariño.' },
  ];

  const PASOS = [
    { n: '1', title: 'Arma', desc: 'Elige tamaño, salsa y tus toppings favoritos.' },
    { n: '2', title: 'Resumen', desc: 'Revisa tu pedido y el total al instante.' },
    { n: '3', title: 'WhatsApp', desc: 'Enviamos tu pedido listo para confirmar.' },
    { n: '4', title: 'Domicilio', desc: 'Lo llevamos calientico... digo, bien frío, a tu casa.' },
  ];

  window.fmt = fmt;
  window.MENU = {
    BRAND, SIZES, SALSAS, TOPPINGS_CLASICOS, TOPPINGS_PREMIUM,
    TOPPING_PRICE, ESPECIALES, OTROS, RESENAS, PASOS,
  };
})();
