// src/components/BottomNavigation.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, ShoppingBag, ShoppingCart } from "lucide-react";

function BottomNavigation() {
  const { pathname } = useLocation();
  const isActive = (path) =>
    pathname === path ? "text-blue-500" : "text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <div className="grid grid-cols-5 h-14">
        {/* 홈 */}
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home className={`h-5 w-5 ${isActive("/")}`} />
          <span className={`text-xs mt-1 ${isActive("/")}`}>홈</span>
        </Link>

        {/* 시설찾기 */}
        <Link to="/search" className="flex flex-col items-center justify-center">
          <Search className={`h-5 w-5 ${isActive("/search")}`} />
          <span className={`text-xs mt-1 ${isActive("/search")}`}>시설찾기</span>
        </Link>

        {/* 찜한목록 */}
        <Link to="/favorites" className="flex flex-col items-center justify-center">
          <Heart className={`h-5 w-5 ${isActive("/favorites")}`} />
          <span className={`text-xs mt-1 ${isActive("/favorites")}`}>찜한목록</span>
        </Link>

        {/* 스토어 */}
        <Link to="/products" className="flex flex-col items-center justify-center">
          {/* isActive에 "/products"를 넘깁니다 */}
          <ShoppingBag className={`h-5 w-5 ${isActive("/products")}`} />
          <span className={`text-xs mt-1 ${isActive("/products")}`}>스토어</span>
        </Link>

        {/* 장바구니 */}
        <Link to="/cart" className="flex flex-col items-center justify-center">
          <ShoppingCart className={`h-5 w-5 ${isActive("/cart")}`} />
          <span className={`text-xs mt-1 ${isActive("/cart")}`}>장바구니</span>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavigation;
