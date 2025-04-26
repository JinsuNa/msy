"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, ShoppingCart } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import Layout from "../components/Layout"

// 백엔드 개발자 참고: GET /api/products API 필요
// 쿼리 파라미터: category, minPrice, maxPrice, sort, page, limit
// 응답 형식: { products: [...], totalPages: number, currentPage: number }
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "popular",
  })
  const [showFilters, setShowFilters] = useState(false)

  // 제품 데이터 가져오기
  useEffect(() => {
    // 실제 구현에서는 Axios를 사용하여 API 호출
    // const fetchProducts = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get('/api/products', { params: filters });
    //     setProducts(response.data.products);
    //   } catch (error) {
    //     console.error('제품을 불러오는 중 오류가 발생했습니다:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchProducts();

    // 임시 데이터
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "실버워커 (바퀴X) 노인용 보행기 경량 접이식 보행보조기",
          price: "220,000원",
          discount: "80%",
          image: "/images/supportive-stroll.png",
          category: "보행보조기",
        },
        {
          id: 2,
          name: "의료용 실버워커(MASSAGE 722F) 노인용 보행기",
          price: "100,000원",
          discount: "50%",
          image: "/images/elderly-woman-using-walker.png",
          category: "보행보조기",
        },
        {
          id: 3,
          name: "의료용 워커 노인 보행기 4발 지팡이 실버카 보행보조기",
          price: "54,000원",
          discount: "60%",
          image: "/images/elderly-woman-using-rollator.png",
          category: "보행보조기",
        },
        {
          id: 4,
          name: "전동침대 의료용 병원침대 환자용 요양원 실버 가정용",
          price: "890,000원",
          discount: "30%",
          image: "/images/modern-hospital-bed.png",
          category: "침대",
        },
        {
          id: 5,
          name: "목욕의자 샤워의자 접이식 목욕의자 실버용품",
          price: "45,000원",
          discount: "20%",
          image: "/images/accessible-bathroom-chair.png",
          category: "목욕용품",
        },
        {
          id: 6,
          name: "고급 원목 지팡이 어르신 선물 효도선물 실버용품",
          price: "38,000원",
          discount: "15%",
          image: "/images/carved-wooden-cane.png",
          category: "지팡이",
        },
      ])
      setLoading(false)
    }, 500)
  }, [filters])

  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // 장바구니에 추가하는 함수
  // 백엔드 개발자 참고: POST /api/cart/add API 필요
  // 요청 형식: { productId: number, quantity: number }
  // 응답 형식: { success: boolean, message: string }
  const addToCart = (product) => {
    // 실제 구현에서는 Axios를 사용하여 API 호출
    // axios.post('/api/cart/add', { productId: product.id, quantity: 1 })
    //   .then(response => {
    //     // 성공 처리
    //   })
    //   .catch(error => {
    //     // 오류 처리
    //   });

    // 임시 알림
    alert(`${product.name}이(가) 장바구니에 추가되었습니다.`)
  }

  // 카테고리 목록
  const categories = [
    { id: "all", name: "전체" },
    { id: "walker", name: "보행보조기" },
    { id: "bed", name: "침대" },
    { id: "bath", name: "목욕용품" },
    { id: "cane", name: "지팡이" },
    { id: "wheelchair", name: "휠체어" },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold mb-4">요양용품 스토어</h1>

        {/* 검색 및 필터 */}
        <div className="mb-4">
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input type="text" placeholder="제품명으로 검색하세요" className="pl-10 pr-4 py-2 w-full rounded-md" />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center text-xs"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-3 w-3 mr-1" />
              필터
            </Button>

            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="text-xs border rounded-md p-1"
            >
              <option value="popular">인기순</option>
              <option value="newest">최신순</option>
              <option value="priceAsc">가격 낮은순</option>
              <option value="priceDesc">가격 높은순</option>
            </select>
          </div>
        </div>

        {/* 필터 패널 */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-sm mb-2">카테고리</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`text-xs px-3 py-1 rounded-full ${
                    filters.category === category.id ? "bg-blue-500 text-white" : "bg-white border"
                  }`}
                  onClick={() => setFilters((prev) => ({ ...prev, category: category.id }))}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <h3 className="font-medium text-sm mb-2">가격대</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                name="minPrice"
                placeholder="최소"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="text-xs p-1 h-8"
              />
              <span>~</span>
              <Input
                type="number"
                name="maxPrice"
                placeholder="최대"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="text-xs p-1 h-8"
              />
              <Button size="sm" className="text-xs h-8">
                적용
              </Button>
            </div>
          </div>
        )}

        {/* 제품 목록 */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-40"></div>
                <div className="p-3">
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="block">
                <div className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/images/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addToCart(product)
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                    </button>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-sm line-clamp-2 mb-1">{product.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{product.price}</span>
                      <span className="text-xs text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductsPage
