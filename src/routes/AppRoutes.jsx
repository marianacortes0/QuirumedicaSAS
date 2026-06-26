import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/Home/HomePage';
import { ShopPage } from '../pages/Shop/ShopPage';
import { CategoriesPage } from '../pages/Categories/CategoriesPage';
import { AboutPage } from '../pages/About/AboutPage';
import { ContactPage } from '../pages/Contact/ContactPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tienda" element={<ShopPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
