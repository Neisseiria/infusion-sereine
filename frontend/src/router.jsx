// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Importer toutes tes pages depuis leurs emplacements corrects
import HomePage from "./pages/Homepage/HomePage.jsx";
import ShopPage from "./pages/Shop/ShopPage.jsx";
import ProductDetailPage from "./pages/Shop/ProductDetailPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import AuthPage from "./pages/Auth/AuthPage.jsx";
import AboutPage from "./pages/Static/AboutPage.jsx";
import ContactPage from "./pages/Static/ContactPage.jsx";
import TermsPage from "./pages/Static/TermsPage.jsx";
import LegalNoticePage from "./pages/Static/LegalNoticePage.jsx";
import PrivacyPolicyPage from "./pages/Static/PrivacyPolicyPage.jsx";
import OrderConfirmationPage from "./pages/Checkout/OrderConfirmationPage.jsx";
import EmailVerificationPage from "./pages/Verification/EmailVerificationPage.jsx";
import VerificationSuccessPage from "./pages/Verification/VerificationSuccessPage.jsx";
import VerificationFailurePage from "./pages/Verification/VerificationFailurePage.jsx";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "nos-infusions", element: <ShopPage /> },
      { path: "infusion/:id", element: <ProductDetailPage /> },
      { path: "panier", element: <CartPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "a-propos", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cgv", element: <TermsPage /> },
      { path: "mentions-legales", element: <LegalNoticePage /> },
      { path: "politique-de-confidentialite", element: <PrivacyPolicyPage /> },
      { path: "confirmation-commande", element: <OrderConfirmationPage /> },
      { path: "verify-email/:token", element: <EmailVerificationPage /> },
      { path: "verification-succes", element: <VerificationSuccessPage /> },
      { path: "verification-echec", element: <VerificationFailurePage /> },
      { path: "mot-de-passe-oublie", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
    ],
  },
]);

export default router;