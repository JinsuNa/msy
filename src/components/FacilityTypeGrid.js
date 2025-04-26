import { Link } from "react-router-dom"

// 시설 유형 데이터
// 백엔드 개발자 참고: GET /api/facility-types API 필요
const facilityTypes = [
  {
    id: 1,
    name: "요양원",
    icon: "/images/요양원.svg",
    path: "/search?type=요양원",
  },
  {
    id: 2,
    name: "실버타운",
    icon: "/images/실버타운.svg",
    path: "/search?type=실버타운",
  },
  {
    id: 3,
    name: "방문간호",
    icon: "/images/방문간호.svg",
    path: "/search?type=방문간호",
  },
  {
    id: 4,
    name: "방문요양",
    icon: "/images/방문요양.svg",
    path: "/search?type=방문요양",
  },
  {
    id: 5,
    name: "주야간보호",
    icon: "/images/주야간보호.svg",
    path: "/search?type=주야간보호",
  },
  {
    id: 6,
    name: "요양병원",
    icon: "/images/요양병원.svg",
    path: "/search?type=요양병원",
  },
  {
    id: 7,
    name: "방문목욕",
    icon: "/images/방문목욕.svg",
    path: "/search?type=방문목욕",
  },
  {
    id: 8,
    name: "단기보호",
    icon: "/images/단기보호.svg",
    path: "/search?type=단기보호",
  },
  {
    id: 9,
    name: "양로원",
    icon: "/images/양로원.svg",
    path: "/search?type=양로원",
  },
]

function FacilityTypeGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {facilityTypes.map((type) => (
        <Link key={type.id} to={type.path} className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
            <img src={type.icon || "/placeholder.svg"} alt={type.name} className="w-6 h-6" />
          </div>
          <span className="text-xs text-center">{type.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default FacilityTypeGrid
