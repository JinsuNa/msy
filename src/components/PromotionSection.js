import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

function PromotionSection() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">맞춤 추천 서비스</h2>
          <Link to="/recommendations" className="text-xs text-gray-500 flex items-center">
            더보기 <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 맞춤 요양 상담 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2">맞춤 요양 상담</h3>
            <p className="text-xs text-gray-600 mb-3">
              어르신의 상태와 가족 상황에 맞는 최적의 요양 서비스를 찾아드립니다.
            </p>
            <Link to="/consultation" className="text-xs text-blue-500 flex items-center">
              상담 신청하기 <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          {/* 요양등급 테스트 */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2">요양등급 테스트</h3>
            <p className="text-xs text-gray-600 mb-3">간단한 테스트로 예상 요양등급을 확인해보세요.</p>
            <Link to="/care-grade-test" className="text-xs text-green-600 flex items-center">
              테스트 시작하기 <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionSection
