import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import FacilityDetailPage from "./pages/FacilityDetailPage"
import FacilityReviewPage from "./pages/FacilityReviewPage"
import FacilityQuestionPage from "./pages/FacilityQuestionPage"
import FacilityCostPage from "./pages/FacilityCostPage"
import FavoritesPage from "./pages/FavoritesPage"
import CartPage from "./pages/CartPage"
import NoticesPage from "./pages/NoticesPage"
import WelfareNewsPage from "./pages/WelfareNewsPage"
import GovernmentProgramsPage from "./pages/GovernmentProgramsPage"
import VideosPage from "./pages/VideosPage"
import SearchPage from "./pages/SearchPage"
import CareGradeTestPage from "./pages/CareGradeTestPage"

// 관리자 페이지 임포트
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import FacilitiesListPage from "./pages/admin/FacilitiesListPage"
import ProductsListPage from "./pages/admin/ProductsListPage"
import SalesManagementPage from "./pages/admin/SalesManagementPage"
import NoticeCreatePage from "./pages/admin/NoticeCreatePage"
import InquiriesPage from "./pages/admin/InquiriesPage"
import AdminProductsNewPage from "./pages/AdminProductsNewPage"
import AdminProductsEditPage from "./pages/AdminProductsEditPage"
import AdminFacilitiesNewPage from "./pages/AdminFacilitiesNewPage"
import AdminFacilitiesEditPage from "./pages/AdminFacilitiesEditPage"
import AdminQuestionsDetailPage from "./pages/AdminQuestionsDetailPage"

import "./App.css"
import { AuthProvider } from "./hooks/use-auth"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/question" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/facility/:id" element={<FacilityDetailPage />} />
          <Route path="/facility/:id/review" element={<FacilityReviewPage />} />
          <Route path="/facility/:id/question" element={<FacilityQuestionPage />} />
          <Route path="/facility/:id/cost" element={<FacilityCostPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/welfare-news" element={<WelfareNewsPage />} />
          <Route path="/government-programs" element={<GovernmentProgramsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/care-grade-test" element={<CareGradeTestPage />} />

          {/* 관리자 라우트 */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/facilities" element={<FacilitiesListPage />} />
          <Route path="/admin/products" element={<ProductsListPage />} />
          <Route path="/admin/sales" element={<SalesManagementPage />} />
          <Route path="/admin/notices/new" element={<NoticeCreatePage />} />
          <Route path="/admin/questions" element={<InquiriesPage />} />
          <Route path="/admin/products/new" element={<AdminProductsNewPage />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductsEditPage />} />
          <Route path="/admin/facilities/new" element={<AdminFacilitiesNewPage />} />
          <Route path="/admin/facilities/:id/edit" element={<AdminFacilitiesEditPage />} />
          <Route path="/admin/questions/:id" element={<AdminQuestionsDetailPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
