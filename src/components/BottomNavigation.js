import { Link, useLocation } from "react-router-dom"
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react"

function BottomNavigation() {
  const location = useLocation()

  // 현재 경로에 따라 활성화된 아이콘 스타일 적용
  const isActive = (path) => {
    return location.pathname === path ? "text-blue-500" : "text-gray-500"
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <div className="grid grid-cols-5 h-14">
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home className={`h-5 w-5 ${isActive("/")}`} />
          <span className={`text-xs mt-1 ${isActive("/")}`}>홈</span>
        </Link>

        <Link to="/search" className="flex flex-col items-center justify-center">
          <Search className={`h-5 w-5 ${isActive("/search")}`} />
          <span className={`text-xs mt-1 ${isActive("/search")}`}>검색</span>
        </Link>

        <Link to="/products" className="flex flex-col items-center justify-center">
          <ShoppingBag className={`h-5 w-5 ${isActive("/products")}`} />
          <span className={`text-xs mt-1 ${isActive("/products")}`}>제품</span>
        </Link>

        <Link to="/favorites" className="flex flex-col items-center justify-center">
          <Heart className={`h-5 w-5 ${isActive("/favorites")}`} />
          <span className={`text-xs mt-1 ${isActive("/favorites")}`}>찜</span>
        </Link>

        <Link to="/login" className="flex flex-col items-center justify-center">
          <User className={`h-5 w-5 ${isActive("/login")}`} />
          <span className={`text-xs mt-1 ${isActive("/login")}`}>내정보</span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNavigation
