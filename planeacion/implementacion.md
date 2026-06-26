# 🩺 Quirumédica SAS — Planeación y Contexto del Proyecto

> **Tipo:** Sitio web corporativo + catálogo (solo **Front-End**)
> **Cliente:** Quirumédica SAS — Venta de instrumentos quirúrgicos
> **Stack:** React + Vite + Tailwind CSS
> **Arquitectura:** Por capas → `Pages` · `Components` · `Hooks` · `Services`
> **Responsive:** Sí (mobile-first, optimizado para celular y escritorio)
> **Integraciones:** · WhatsApp Business (redirección)

---

## 1. Objetivo del proyecto

Construir una página web responsive para **Quirumédica SAS**, empresa dedicada a la venta de instrumentos quirúrgicos. El sitio es **únicamente front-end** (sin backend propio): los datos de productos se sirven desde archivos/mocks locales, el contacto se canaliza vía **WhatsApp Business** y la ubicación se muestra con **Google Maps**.

### Alcance
- ✅ Maquetación responsive (celular + computador).
- ✅ Catálogo de productos con categorías y filtros (datos locales).
- ✅ Galería desplegable de productos en el Inicio.
- ✅ Botón/desplegable flotante de WhatsApp (solo redirección a URL).
- ✅ Formulario de Contacto.
- ❌ No incluye: pasarela de pago, login, panel admin, base de datos, API real.

---

## 2. Stack tecnológico

| Herramienta                | Uso                                                        |
|----------------------------|------------------------------------------------------------|
| **React 18**               | Librería de UI basada en componentes                       |
| **Vite**                   | Bundler / dev server rápido (HMR)                          |
| **Tailwind CSS**           | Estilos utility-first, responsive con breakpoints          |
| **React Router**           | Navegación entre páginas (SPA)                             |
| **@react-google-maps/api** | Integración de Google Maps en React                        |
| **lucide-react**           | Iconografía (carrito, menú, WhatsApp, flechas, pin)        |

> **Nota responsive:** Tailwind se usa *mobile-first*. Las clases base aplican a celular y se escalan con prefijos `sm:`, `md:`, `lg:`, `xl:`.

---

## 3. Paleta de colores (referencia: marca JS MAXYGO)

Tomada de la página de referencia entregada por la clienta. Combina un **navy profundo** corporativo, un **verde de marca** (logo) y un **teal de acento** para botones y enlaces.

| Token            | Hex        | Uso principal                                          |
|------------------|------------|--------------------------------------------------------|
| `primary` (navy) | `#1E2A3A`  | Texto principal, títulos, navbar                       |
| `dark`           | `#1E2630`  | Fondo de sección oscura (contacto, footer)             |
| `brand` (verde)  | `#6BA583`  | Acentos de marca, ícono del logo, detalles             |
| `accent` (teal)  | `#34B3AC`  | Botones primarios, enlaces, bordes destacados          |
| `surface`        | `#FFFFFF`  | Fondos claros, tarjetas                                |
| `muted`          | `#64748B`  | Texto secundario / descripciones                       |
| `border`         | `#E5E7EB`  | Bordes suaves, divisores                               |
| `whatsapp`       | `#25D366`  | Botón flotante de WhatsApp                             |

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E2A3A",
          light: "#34465C",
          dark: "#1E2630",
        },
        brand: {
          DEFAULT: "#6BA583",
          light: "#8DBFA1",
          dark: "#52866A",
        },
        accent: {
          DEFAULT: "#34B3AC",
          light: "#5AC7C1",
          dark: "#268C86",
        },
        muted: "#64748B",
        whatsapp: "#25D366",
      },
      fontFamily: {
        // La referencia usa una serif para títulos y sans para texto
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

> **Tipografía sugerida (según referencia):** títulos en *serif* tipo Playfair Display; cuerpo en *sans-serif* (Inter). Ajustable según la identidad final de Quirumédica.

---

## 4. Arquitectura por capas

**Regla de dependencia:** `Pages → Hooks → Services`. Nunca al revés.
Los `Components` son UI pura reutilizable, sin lógica de negocio.

```
┌─────────────────────────────────────────────┐
│  PAGES        Composición visual + rutas      │  ← Inicio, Tienda, Categorías, Contacto
├─────────────────────────────────────────────┤
│  COMPONENTS   UI pura reutilizable            │  ← Navbar, Card, Footer, WhatsAppFab, MapView
├─────────────────────────────────────────────┤
│  HOOKS        Estado, efectos, orquestación   │  ← useProducts, useCategories, useFilter, useMap
├─────────────────────────────────────────────┤
│  SERVICES     Acceso a datos (mocks/JSON/API) │  ← productsService, categoriesService, mapsService
└─────────────────────────────────────────────┘
```

### Responsabilidad de cada capa

#### `services/` — Acceso a datos / integraciones
- Funciones puras (sin `useState`, sin hooks de React).
- Leen datos desde JSON/mock local; preparadas para migrar a API real sin tocar las demás capas.
- Encapsulan la config de integraciones externas (ej.: coordenadas y opciones de Google Maps).
- Devuelven datos o lanzan errores.

#### `hooks/` — Estado y lógica
- `useState`, `useEffect`, `useMemo`, `useCallback`.
- **Solo** llaman a Services, nunca hacen `fetch` directo.
- Exponen una interfaz limpia: `{ data, loading, error, acciones }`.
- Un hook por dominio (productos, categorías, filtros, mapa).

#### `components/` — UI reutilizable
- Reciben props, renderizan JSX, emiten eventos hacia arriba.
- Sin lógica de negocio ni llamadas a Services.

#### `pages/` — Vistas / rutas
- Componen la vista usando hooks + components.
- No tienen lógica de negocio ni llaman Services directamente.

---

## 5. Estructura de directorios

```
quirumedica-sas/
├── public/
│   └── images/
│       └── productos/              # Imágenes de instrumentos quirúrgicos
│
├── src/
│   ├── pages/                      # CAPA: Pages (vistas / rutas)
│   │   ├── Home/
│   │   │   └── HomePage.jsx        # Inicio + galería desplegable
│   │   ├── Shop/
│   │   │   └── ShopPage.jsx        # Tienda / catálogo
│   │   ├── Categories/
│   │   │   └── CategoriesPage.jsx  # Categorías de productos
│   │   └── Contact/
│   │       └── ContactPage.jsx     # Contacto + mapa Google Maps
│   │
│   ├── components/                 # CAPA: Components (UI pura)
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Responsive (menú hamburguesa en móvil)
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx          # Wrapper común (Navbar + Outlet + Footer + Fab)
│   │   ├── product/
│   │   │   ├── ProductCard.jsx     # Tarjeta de producto
│   │   │   ├── ProductGrid.jsx     # Grilla responsive
│   │   │   └── ProductGallery.jsx  # Galería desplegable (Inicio)
│   │   ├── category/
│   │   │   └── CategoryCard.jsx
│   │   ├── map/
│   │   │   └── MapView.jsx         # Mapa de Google Maps (recibe center/marker por props)
│   │   └── common/
│   │       ├── WhatsAppFab.jsx     # Botón flotante + desplegable WhatsApp
│   │       ├── SearchBar.jsx
│   │       ├── Loader.jsx
│   │       └── ErrorMessage.jsx
│   │
│   ├── hooks/                      # CAPA: Hooks (estado + lógica)
│   │   ├── useProducts.js
│   │   ├── useCategories.js
│   │   ├── useProductFilter.js     # Filtros por categoría / búsqueda
│   │   └── useMap.js               # Carga del SDK + estado del mapa
│   │
│   ├── services/                   # CAPA: Services (acceso a datos)
│   │   ├── productsService.js
│   │   ├── categoriesService.js
│   │   └── mapsService.js          # Coordenadas + opciones del mapa
│   │
│   ├── data/                       # Datos locales (mock front-end)
│   │   ├── products.json
│   │   └── categories.json
│   │
│   ├── config/
│   │   ├── contact.js              # URL WhatsApp Business, teléfono, email
│   │   └── maps.js                 # API key (desde .env), zoom, estilos
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx           # Definición de rutas (React Router)
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Directivas de Tailwind
│
├── .env                            # VITE_GOOGLE_MAPS_API_KEY (NO se commitea)
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 6. Secciones / Páginas

### 6.1 Inicio (`HomePage`)
- **Hero** con presentación de Quirumédica SAS.
- **Galería desplegable de productos**: imágenes que se expanden/colapsan (acordeón o carrusel) mostrando los productos destacados.
- Acceso rápido a Tienda y Categorías.
- *Componentes:* `ProductGallery`, `ProductCard`.
- *Hooks:* `useProducts` (productos destacados).

### 6.2 Tienda (`ShopPage`)
- **Catálogo** completo en grilla responsive.
- Barra de búsqueda + filtro por categoría.
- *Componentes:* `ProductGrid`, `ProductCard`, `SearchBar`.
- *Hooks:* `useProducts`, `useProductFilter`.

### 6.3 Categorías (`CategoriesPage`)
- Listado de categorías de instrumentos quirúrgicos (ej.: tijeras, pinzas, bisturíes, separadores, suturas).
- Al seleccionar una categoría → filtra el catálogo.
- *Componentes:* `CategoryCard`, `ProductGrid`.
- *Hooks:* `useCategories`, `useProductFilter`.

### 6.4 Contacto (`ContactPage`)
- Datos de la empresa (dirección, teléfono, email).
- **Mapa de ubicación con Google Maps** (`MapView`).
- Formulario de contacto (solo front: validación local; envío redirige a WhatsApp o `mailto`).
- Botón directo a **WhatsApp Business**.
- *Componentes:* `MapView`.
- *Hooks:* `useMap`.
- *Config:* `config/contact.js`, `config/maps.js`.

---

## 8. WhatsApp Business (desplegable flotante)

Componente `WhatsAppFab` — botón flotante fijo (esquina inferior derecha, color `#25D366`) visible en todas las páginas vía `Layout`.

- Al hacer clic → despliega una mini-tarjeta y/o abre directamente la **URL de WhatsApp Business**.
- **Solo redirección**, sin integración de API.
- Formato de URL:

```
https://wa.me/57XXXXXXXXXX?text=Hola%20Quirum%C3%A9dica%20SAS%2C%20deseo%20informaci%C3%B3n
```

- La URL y el número se centralizan en `config/contact.js`:

```js
// config/contact.js
export const CONTACT = {
  whatsapp: {
    phone: "57XXXXXXXXXX",                 // ← número WhatsApp Business
    defaultMessage: "Hola Quirumédica SAS, deseo información sobre sus instrumentos quirúrgicos.",
    url: "https://wa.me/57XXXXXXXXXX",
  },
  email: "contacto@quirumedica.com",       // ← placeholder
  phone: "+57 XXX XXX XXXX",
};
```

> ⚠️ **Pendiente de confirmar:** número real de WhatsApp Business y datos de contacto.

---

## 9. Diseño responsive (mobile-first)

| Breakpoint Tailwind | Ancho     | Comportamiento clave                                  |
|---------------------|-----------|-------------------------------------------------------|
| base (`< 640px`)    | Celular   | Menú hamburguesa, grilla 1 columna, Fab WhatsApp      |
| `sm: ≥ 640px`       | Móvil L   | Grilla 2 columnas                                     |
| `md: ≥ 768px`       | Tablet    | Navbar horizontal, grilla 2–3 columnas                |
| `lg: ≥ 1024px`      | Escritorio| Grilla 3–4 columnas, layout completo                  |
| `xl: ≥ 1280px`      | Monitor   | Contenedor centrado con ancho máximo                  |

- **Navbar:** menú hamburguesa colapsable en móvil, barra horizontal en escritorio (fondo blanco, links navy).
- **Galería e imágenes:** `object-cover`, lazy loading, `aspect-ratio` fijo.
- **Grillas:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`.
- **Mapa:** alto fijo (`h-[400px]`) en escritorio, `h-[280px]` en móvil; ancho 100%.

---

## 10. Flujo de datos (ejemplo: cargar catálogo)

```
Usuario abre /tienda (ShopPage)
  → ShopPage usa useProducts()
    → useProducts() llama productsService.getProducts()
      → productsService lee data/products.json
    ← devuelve lista de productos
  ← useProducts actualiza estado (data, loading, error)
← ShopPage renderiza <ProductGrid /> con los productos
```

Migrar a API real en el futuro = cambiar **solo** los Services (las demás capas no se tocan).

---

## 11. Modelo de datos (mock front-end)

```jsonc
// data/products.json
{
  "categorias": [
    {
      "nombre": "Tijeras",
      "items": [
        {
          "id": 1,
          "nombre": "Tijera Mayo Curva",
          "imagen": "images\products\Tijera-de-mayo-curva-de-14-cms.png",
          "medidas": "14.5 cm",
          "descripcion": "Tijera quirúrgica pesada para cortar tejido conectivo denso, fascia y suturas. Hojas curvas con puntas romas para disección precisa."
        },
        {
          "id": 2,
          "nombre": "Tijera Mayo Recta",
          "imagen": "images\products\tijera_de_mayo_recta_14.jpg",
          "medidas": "14 cm",
          "descripcion": "Tijera de disección pesada con hoja recta. Utilizada para cortar fascia, tejido conectivo y suturas gruesas."
        },
        {
          "id": 3,
          "nombre": "Tijera Metzenbaum Recta",
          "imagen": "images\products\tijera-metzenbaum-recta-para-tejido-punta-roma-long-30-cm-12.jpg",
          "medidas": "14 - 20 cm",
          "descripcion": "Tijera de disección delicada para tejidos blandos. Hojas largas y finas para disección precisa."
        },
        {
          "id": 4,
          "nombre": "Tijera Metzenbaum Curva",
          "imagen": "images\products\tijeras-metzenbaum-curva.jpeg",
          "medidas": "14.5 - 20 cm",
          "descripcion": "Tijera de disección curva para tejidos delicados en espacios profundos y reducidos."
        }
      ]
    },
    {
      "nombre": "Pinzas",
      "items": [
        {
          "id": 5,
          "nombre": "Portaagujas Mayo-Hegar",
          "imagen": "images\products\2.UltraGripX_-TC-Mayo-Hegar-Needle-Holder.jpg",
          "medidas": "14 - 18 cm",
          "descripcion": "Instrumento con traba para sujetar y conducir agujas de sutura con precisión."
        },
        {
          "id": 6,
          "nombre": "Pinza Adson con Garra",
          "imagen": "images\products\3.pinza-adson-con-garra-12cm-ref-03301600_600x600_crop_center.webp",
          "medidas": "12 cm",
          "descripcion": "Pinza de tejido delicada con dientes 1x2 para manipulación de piel y tejidos densos."
        },
        {
          "id": 7,
          "nombre": "Pinza Adson sin Garra",
          "imagen": "images\products\pinza_adson_singarra12.jpg",
          "medidas": "12 cm",
          "descripcion": "Pinza de disección delicada sin dientes para manipulación atraumática de tejidos blandos."
        },
        {
          "id": 8,
          "nombre": "Pinza Kelly Curva",
          "imagen": "images\products\4.PinzaKelly_Curva20cm.jpg",
          "medidas": "14 cm",
          "descripcion": "Pinza hemostática curva utilizada para pinzar vasos sanguíneos medianos y pequeños."
        },
        {
          "id": 9,
          "nombre": "Pinza Kelly Recta",
          "imagen": "images\products\5.Pinza_kelly_recta.webp",
          "medidas": "20 cm",
          "descripcion": "Pinza hemostática recta multipropósito para control de sangrado y disección de tejidos."
        },
        {
          "id": 10,
          "nombre": "Pinza Backhaus",
          "imagen": "images\products\PINZA-DE-CAMPO-BACKHAUS.jpg",
          "medidas": "11 cm",
          "descripcion": "Pinza de campo quirúrgico utilizada para fijar campos estériles y paños quirúrgicos."
        },
        {
          "id": 11,
          "nombre": "Pinza Biopsia Schubert",
          "imagen": "images\products\Pinzas_Biopsia_Schubert_recta20-736-29.jpg",
          "medidas": "21.5 - 26 cm",
          "descripcion": "Pinza ginecológica para obtención de muestras de tejido uterino o cervical."
        },
        {
          "id": 12,
          "nombre": "Pinza Biopsia Schubert Curva",
          "imagen": "images\products\pinza_shucbert.jpg",
          "medidas": "26 cm",
          "descripcion": "Pinza de biopsia con mandíbulas curvas para procedimientos ginecológicos."
        },
        {
          "id": 13,
          "nombre": "Pinza Lewin para Reducción Ósea",
          "imagen": "images\products\pinza-lewin-en-punta-para-reducción-de-huesos-cat-3240217-dimeda-aleman-se-utiliza.jpg",
          "medidas": "18 - 20 cm",
          "descripcion": "Pinza ortopédica para reducción y alineación de fragmentos óseos."
        },
        {
          "id": 14,
          "nombre": "Pinza Mosquito Curva",
          "imagen": "images\products\pinza_mosquito_curva.webp",
          "medidas": "12.5 cm",
          "descripcion": "Pinza hemostática delicada para control de vasos pequeños y procedimientos finos."
        },
        {
          "id": 15,
          "nombre": "Pinza Mosquito Recta",
          "imagen": "images\products\pinza_mosquito_recta.jpg",
          "medidas": "14 cm",
          "descripcion": "Pinza hemostática recta de precisión para vasos pequeños y tejidos delicados."
        },
        {
          "id": 16,
          "nombre": "Pinza de Reducción con Mandíbulas Dentadas",
          "imagen": "images\products\pinza_Reduccion_mandibulas_dentalas.jpg",
          "medidas": "14 - 16 cm",
          "descripcion": "Instrumento ortopédico para reducción y estabilización de fracturas."
        },
        {
          "id": 17,
          "nombre": "Pinza Kerrison de Corte Óseo",
          "imagen": "images\products\pinza_kerrison.jpg",
          "medidas": "15 - 20 cm",
          "descripcion": "Pinza de neurocirugía para remoción de hueso en procedimientos de columna y descompresión neural."
        }
      ]
    },
    {
      "nombre": "Separadores",
      "items": []
    },
    {
      "nombre": "Suturas",
      "items": [
        {
          "id": 18,
          "nombre": "Portaagujas Mayo-Hegar",
          "imagen": "images\products\portaasugjas mayohegar.jpg",
          "medidas": "14 - 18 cm",
          "descripcion": "Instrumento esencial para manipulación y colocación de suturas quirúrgicas."
        }
      ]
    },
    {
      "nombre": "Esterilizacion",
      "items": []
    },
    {
      "nombre": "Insumos",
      "items": [
        {
          "id": 19,
          "nombre": "Histerómetro Sims Maleable",
          "imagen": "images\products\histerometro-sims-maleable-graduado-en-centímetros-plateado-ø-4-mm-long-34-cm-13-1-2.jpg",
          "medidas": "32 - 34 cm",
          "descripcion": "Instrumento graduado para medir la profundidad y dirección de la cavidad uterina."
        }
      ]
    }
  ]
}
```

```jsonc
// data/categories.json
[
  { "id": "cat-tijeras",  "name": "Tijeras",   "icon": "scissors" },
  { "id": "cat-pinzas",   "name": "Pinzas",    "icon": "grip" },
  { "id": "cat-bisturis", "name": "Bisturíes", "icon": "slice" }
]
```

---

## 12. Rutas (React Router)

| Ruta           | Página             |
|----------------|--------------------|
| `/`            | `HomePage`         |
| `/tienda`      | `ShopPage`         |
| `/categorias`  | `CategoriesPage`   |
| `/contacto`    | `ContactPage`      |
| `*`            | `NotFound` (404)   |

---

## 13. Pasos de implementación (orden sugerido)

1. **Setup**: `npm create vite@latest` (plantilla React) + instalar y configurar Tailwind.
2. **Tema**: aplicar la **paleta** en `tailwind.config.js` + tipografías; `index.css`.
3. **Datos**: crear `data/products.json` y `data/categories.json`.
4. **Config**: `config/contact.js` y `config/maps.js` + `.env` con la API key.
5. **Services**: `productsService.js`, `categoriesService.js`, `mapsService.js`.
6. **Hooks**: `useProducts`, `useCategories`, `useProductFilter`, `useMap`.
7. **Components layout**: `Navbar` (responsive), `Footer`, `Layout`, `WhatsAppFab`.
8. **Components**: `ProductCard`, `ProductGrid`, `ProductGallery`, `CategoryCard`, `MapView`.
9. **Pages**: Inicio → Tienda → Categorías → Contacto (con mapa).
10. **Routing**: `AppRoutes.jsx` + integración en `App.jsx`.
11. **Responsive QA**: pruebas en celular y escritorio, ajuste de breakpoints y mapa.

---

## 14. Checklist de calidad (arquitectura)

- [ ] ¿Los Services son funciones puras, sin hooks ni estado?
- [ ] ¿Los Hooks solo llaman a Services (nunca `fetch` directo)?
- [ ] ¿Las Pages no contienen lógica de negocio ni `useState` complejo?
- [ ] ¿Las Pages no importan Services directamente?
- [ ] ¿Los Components son UI pura (props + JSX), sin negocio?
- [ ] ¿Loading y errores se manejan en el Hook?
- [ ] ¿Todo es responsive (probado en móvil y escritorio)?
- [ ] ¿La URL de WhatsApp está centralizada en `config/contact.js`?
- [ ] ¿La API key de Maps está en `.env` y restringida por dominio (no hardcodeada)?
- [ ] ¿La paleta se consume vía tokens de Tailwind (no hex sueltos en el JSX)?

---

## 15. Puntos pendientes por confirmar

> Estos datos no están definidos en el requerimiento y se dejan como *placeholders*:

1. **Número real de WhatsApp Business.** 
2. **Datos de contacto** (dirección, email, teléfono fijo): 
4. **Logo de Quirumédica SAS** C:\Users\maria\QuirumedicaSAS\images\logo
5. **Listado real de productos y categorías** (o si se usan datos de ejemplo).
6. **¿El catálogo muestra precios?** NO
7. **Logo de Whattsapp**C:\Users\maria\QuirumedicaSAS\images\logo_whattsapp\images.png