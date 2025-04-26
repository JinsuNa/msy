"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FacilityList from "../components/FacilityList"
import RegionSelector from "../components/RegionSelector"
import FacilityTypeSelector from "../components/FacilityTypeSelector"

/**
 * 시설 검색 페이지 컴포넌트
 *
 * @component
 * @description 사용자가 지역과 시설 유형을 선택하여 시설을 검색할 수 있는 페이지
 *
 * @backend_api {GET} /api/facilities - 시설 목록 조회
 * @backend_params {string} region - 선택된 지역
 * @backend_params {string} facilityType - 선택된 시설 유형
 * @backend_params {number} page - 페이지 번호
 * @backend_params {number} limit - 페이지당 항목 수
 * @backend_response {Array} facilities - 시설 목록
 * @backend_response {number} totalCount - 전체 시설 수
 */
function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState("전국")
  const [selectedFacilityType, setSelectedFacilityType] = useState("전체")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // URL 쿼리 파라미터에서 초기 검색 조건 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const regionParam = params.get("region")
    const typeParam = params.get("type")
    const pageParam = params.get("page")

    if (regionParam) setSelectedRegion(regionParam)
    if (typeParam) setSelectedFacilityType(typeParam)
    if (pageParam) setPage(Number.parseInt(pageParam, 10))

    fetchFacilities()
  }, [location.search])

  // 시설 데이터 가져오기
  const fetchFacilities = async () => {
    setLoading(true)
    try {
      // 백엔드 API 호출
      // 개발 중에는 더미 데이터 사용
      setTimeout(() => {
        setFacilities([
          {
            id: 1,
            name: "행복요양원",
            type: "요양원",
            address: "서울시 강남구",
            rating: 4.5,
            reviewCount: 28,
            imageUrl: "/intergenerational-care.png",
          },
          {
            id: 2,
            name: "미소요양병원",
            type: "요양병원",
            address: "서울시 서초구",
            rating: 4.2,
            reviewCount: 15,
            imageUrl: "/modern-hospital-exterior.png",
          },
          {
            id: 3,
            name: "푸른실버타운",
            type: "실버타운",
            address: "경기도 고양시",
            rating: 4.8,
            reviewCount: 42,
            imageUrl: "/sunny-senior-gathering.png",
          },
        ])
        setTotalPages(3)
        setLoading(false)
        setError(null)
      }, 500)

      // 실제 API 연동 시 아래 코드 사용
      /*
      const response = await axios.get("/api/facilities", {
        params: {
          region: selectedRegion !== "전국" ? selectedRegion : undefined,
          facilityType: selectedFacilityType !== "전체" ? selectedFacilityType : undefined,
          page: page,
          limit: 10,
        },
      })

      setFacilities(response.data.facilities)
      setTotalPages(Math.ceil(response.data.totalCount / 10))
      setLoading(false)
      */
    } catch (err) {
      console.error("시설 데이터를 불러오는 중 오류가 발생했습니다:", err)
      setError("시설 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.")
      setLoading(false)
    }
  }

  // 지역 선택 변경 시 처리
  const handleRegionChange = (region) => {
    const regionName = region.province + (region.city ? ` ${region.city}` : "")
    setSelectedRegion(regionName)
    updateSearchParams("region", regionName)
  }

  // 시설 유형 선택 변경 시 처리
  const handleFacilityTypeChange = (type) => {
    setSelectedFacilityType(type)
    updateSearchParams("type", type)
  }

  // 페이지 변경 시 처리
  const handlePageChange = (newPage) => {
    setPage(newPage)
    updateSearchParams("page", newPage.toString())
  }

  // URL 쿼리 파라미터 업데이트
  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(location.search)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // 페이지 파라미터 초기화 (지역이나 시설 유형이 변경된 경우)
    if (key !== "page") {
      params.delete("page")
      setPage(1)
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">시설 검색</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
        </div>
        <div className="w-full md:w-1/2">
          <FacilityTypeSelector selectedType={selectedFacilityType} onTypeChange={handleFacilityTypeChange} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <FacilityList
          facilities={facilities}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default SearchPage
