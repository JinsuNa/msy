"use client"
import { Link } from "react-router-dom"
import { Search, MessageCircle, ChevronRight, ShoppingCart } from "lucide-react"

import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import FacilityTypeGrid from "../components/FacilityTypeGrid"
import FaqSection from "../components/FaqSection"
import PromotionSection from "../components/PromotionSection"
import NoticeBar from "../components/NoticeBar"
import VideoSection from "../components/VideoSection"
import BottomNavigation from "../components/BottomNavigation"

// 제품 데이터 - 실제 구현에서는 API에서 가져올 수 있음
// API 엔드포인트: GET /api/products/featured
// 백엔드 개발자 참고: 인기 제품 3개만 반환하는 API 필요
const products = [
  {
    id: 1,
    name: "실버워커 (바퀴X) 노인용 보행기 경량 접이식 보행보조기",
    price: "220,000원",
    discount: "80%",
    image: "/images/supportive-stroll.png",
  },
  {
    id: 2,
    name: "의료용 실버워커(MASSAGE 722F) 노인용 보행기",
    price: "100,000원",
    discount: "50%",
    image: "/images/elderly-woman-using-walker.png",
  },
  {
    id: 3,
    name: "의료용 워커 노인 보행기 4발 지팡이 실버카 보행보조기",
    price: "54,000원",
    discount: "60%",
    image: "/images/elderly-woman-using-rollator.png",
  },
]

function HomePage() {
  // 장바구니에 추가하는 함수
  // 백엔드 개발자 참고: POST /api/cart/add API 필요
  const addToCart = (product) => {
    // 실제 구현에서는 Axios를 사용하여 API 호출
    // axios.post('/api/cart/add', product)
    //   .then(response => {
    //     // 성공 처리
    //   })
    //   .catch(error => {
    //     // 오류 처리
    //   });

    // 임시 알림
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="로고" className="w-6 h-6" />
            <span className="font-medium text-sm">요양시설/병원 정보찾기 서비스</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs">
                로그인
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost" size="sm" className="text-xs">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Notice Bar */}
        <NoticeBar />

        {/* Search Section */}
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="시설명, 지역명으로 검색하세요"
              className="pl-10 pr-4 py-2 w-full rounded-md"
            />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-100 rounded-xl p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="z-10">
                <div className="flex space-x-2 mb-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">요양 고민</span>
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">상담</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">정보</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">함께 소통해요!</h1>
              </div>
              <div className="ml-auto">
                <img
                  src="/images/compassionate-elder-care-chat.png"
                  alt="상담 이미지"
                  className="z-10"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Facility Types Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="font-medium">전문가에 무료상담하기</h2>
            </div>
            <FacilityTypeGrid />
          </div>
        </div>

        {/* 영상으로 만나는 요양정보 */}
        <VideoSection />

        {/* 맞춤 추천 서비스 */}
        <PromotionSection />

        {/* 제품 섹션 - 스토어 바로가기 링크 */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">인기 제품 추천 상품</h2>
              <Link to="/products" className="text-xs text-gray-500 flex items-center">
                더보기 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-blue-500 rounded-xl p-4 mb-4">
              <div className="text-white mb-2">요양원 입소 전 준비하세요.</div>
              <div className="flex items-center">
                <Link to="/products" className="bg-yellow-400 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                  스토어 바로가기 &gt;
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="block">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image || "/images/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            discount: product.discount,
                          })
                        }}
                      >
                        <ShoppingCart className="h-3 w-3 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-2">
                      <div className="text-xs line-clamp-2">{product.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-medium">{product.price}</span>
                        <span className="text-xs text-red-500">{product.discount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation currentPath="/" />
    </div>
  )
}

export default HomePage
