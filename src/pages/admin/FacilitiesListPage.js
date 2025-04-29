"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import Skeleton from "../../components/ui/Skeleton"
import Badge from "../../components/ui/Badge"
import "../../styles/AdminFacilitiesListPage.css"

/**
 * 시설 목록 페이지
 * 등록된 모든 시설을 관리할 수 있는 관리자 페이지입니다.
 */
const FacilitiesListPage = () => {
  const navigate = useNavigate()
  const [facilities, setFacilities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // 시설 데이터 로드
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // TODO: 백엔드 API 연동 - 시설 목록 요청
        // 현재는 더미 데이터로 대체
        setTimeout(() => {
          const dummyFacilities = [
            {
              id: 1,
              name: "행복요양원",
              type: "요양원",
              address: "서울시 강남구 테헤란로 123",
              phone: "02-1234-5678",
              status: "approved",
              rating: 4.5,
              reviewCount: 42,
              createdAt: new Date("2023-01-15"),
            },
            {
              id: 2,
              name: "미소요양병원",
              type: "요양병원",
              address: "서울시 서초구 서초대로 456",
              phone: "02-2345-6789",
              status: "approved",
              rating: 4.2,
              reviewCount: 38,
              createdAt: new Date("2023-02-20"),
            },
            {
              id: 3,
              name: "푸른실버타운",
              type: "실버타운",
              address: "경기도 고양시 일산동구 중앙로 789",
              phone: "031-345-6789",
              status: "approved",
              rating: 4.7,
              reviewCount: 31,
              createdAt: new Date("2023-03-10"),
            },
            {
              id: 4,
              name: "사랑방문요양센터",
              type: "방문요양",
              address: "서울시 송파구 올림픽로 101",
              phone: "02-3456-7890",
              status: "pending",
              rating: 0,
              reviewCount: 0,
              createdAt: new Date("2023-04-05"),
            },
            {
              id: 5,
              name: "건강요양원",
              type: "요양원",
              address: "경기도 성남시 분당구 판교로 202",
              phone: "031-456-7890",
              status: "approved",
              rating: 4.0,
              reviewCount: 25,
              createdAt: new Date("2023-05-12"),
            },
            {
              id: 6,
              name: "햇살주야간보호센터",
              type: "주야간보호",
              address: "서울시 마포구 와우산로 303",
              phone: "02-4567-8901",
              status: "rejected",
              rating: 0,
              reviewCount: 0,
              createdAt: new Date("2023-06-18"),
            },
            {
              id: 7,
              name: "평화요양병원",
              type: "요양병원",
              address: "인천시 연수구 센트럴로 404",
              phone: "032-567-8901",
              status: "approved",
              rating: 3.8,
              reviewCount: 19,
              createdAt: new Date("2023-07-22"),
            },
            {
              id: 8,
              name: "가족방문간호센터",
              type: "방문간호",
              address: "서울시 강서구 공항대로 505",
              phone: "02-5678-9012",
              status: "pending",
              rating: 0,
              reviewCount: 0,
              createdAt: new Date("2023-08-30"),
            },
          ]

          setFacilities(dummyFacilities)
          setTotalPages(Math.ceil(dummyFacilities.length / 10)) // 페이지당 10개 항목
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("시설 목록 로드 중 오류 발생:", error)
        setIsLoading(false)
      }
    }

    fetchFacilities()
  }, [])

  // 시설 상세 페이지로 이동
  const handleViewDetail = (facilityId) => {
    navigate(`/admin/facilities/${facilityId}`)
  }

  // 시설 수정 페이지로 이동
  const handleEdit = (facilityId) => {
    navigate(`/admin/facilities/${facilityId}/edit`)
  }

  // 시설 삭제 처리
  const handleDelete = (facilityId) => {
    if (window.confirm("정말로 이 시설을 삭제하시겠습니까?")) {
      // TODO: 백엔드 API 연동 - 시설 삭제 요청
      console.log(`시설 ID ${facilityId} 삭제 요청`)

      // 임시로 프론트엔드에서만 삭제 처리
      setFacilities(facilities.filter((facility) => facility.id !== facilityId))
    }
  }

  // 시설 상태 변경 처리
  const handleStatusChange = (facilityId, newStatus) => {
    // TODO: 백엔드 API 연동 - 시설 상태 변경 요청
    console.log(`시설 ID ${facilityId}의 상태를 ${newStatus}로 변경 요청`)

    // 임시로 프론트엔드에서만 상태 변경 처리
    setFacilities(
      facilities.map((facility) => (facility.id === facilityId ? { ...facility, status: newStatus } : facility)),
    )
  }

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  // 상태 필터 변경 핸들러
  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  // 유형 필터 변경 핸들러
  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  // 필터링된 시설 목록
  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || facility.status === filterStatus
    const matchesType = filterType === "all" || facility.type === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  // 페이지네이션 처리
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentFacilities = filteredFacilities.slice(indexOfFirstItem, indexOfLastItem)
  const totalFilteredPages = Math.ceil(filteredFacilities.length / itemsPerPage)

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // 상태에 따른 배지 색상 및 텍스트
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">승인됨</Badge>
      case "pending":
        return <Badge variant="warning">대기중</Badge>
      case "rejected":
        return <Badge variant="danger">거부됨</Badge>
      default:
        return <Badge>알 수 없음</Badge>
    }
  }

  // 날짜 포맷팅
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ko-KR")
  }

  // 새 시설 등록 페이지로 이동
  const handleAddNewFacility = () => {
    navigate("/admin/facilities/new")
  }

  // 로딩 중 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="admin-facilities-list">
        <div className="admin-header">
          <h1>시설 목록</h1>
          <Skeleton className="admin-button-skeleton" />
        </div>

        <div className="admin-filters">
          <Skeleton className="admin-search-skeleton" />
          <div className="admin-filter-group">
            <Skeleton className="admin-filter-skeleton" />
            <Skeleton className="admin-filter-skeleton" />
          </div>
        </div>

        <div className="admin-table-container">
          <Skeleton className="admin-table-skeleton" height="400px" />
        </div>

        <div className="admin-pagination">
          <Skeleton className="admin-pagination-skeleton" />
        </div>
      </div>
    )
  }

  return (
    <div className="admin-facilities-list">
      <div className="admin-header">
        <h1>시설 목록</h1>
        <Button onClick={handleAddNewFacility}>새 시설 등록</Button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <input
            type="text"
            placeholder="시설명 또는 주소로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            className="admin-search-input"
          />
        </div>

        <div className="admin-filter-group">
          <select value={filterStatus} onChange={handleStatusFilterChange} className="admin-filter-select">
            <option value="all">모든 상태</option>
            <option value="approved">승인됨</option>
            <option value="pending">대기중</option>
            <option value="rejected">거부됨</option>
          </select>

          <select value={filterType} onChange={handleTypeFilterChange} className="admin-filter-select">
            <option value="all">모든 유형</option>
            <option value="요양원">요양원</option>
            <option value="요양병원">요양병원</option>
            <option value="실버타운">실버타운</option>
            <option value="방문요양">방문요양</option>
            <option value="방문간호">방문간호</option>
            <option value="주야간보호">주야간보호</option>
          </select>
        </div>
      </div>

      {filteredFacilities.length === 0 ? (
        <div className="admin-empty-state">
          <p>검색 조건에 맞는 시설이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>시설명</th>
                  <th>유형</th>
                  <th>주소</th>
                  <th>연락처</th>
                  <th>상태</th>
                  <th>평점</th>
                  <th>등록일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
  {currentFacilities.map((facility) => (
    <tr key={facility.id}>
      <td>{facility.name}</td>
      <td>{facility.type}</td>
      <td>{facility.address}</td>
      <td>{facility.phone}</td>
      <td>{getStatusBadge(facility.status)}</td>
      <td>{facility.status === "approved" ? `${facility.rating} (${facility.reviewCount})` : "-"}</td>
      <td>{formatDate(facility.createdAt)}</td>
      <td className="admin-actions">
        {/* 상세 버튼 임시 비활성화 */}
        {/* 
        <Button variant="outline" size="sm" onClick={() => handleViewDetail(facility.id)}>
          상세
        </Button>
        */}

        <Button variant="outline" size="sm" onClick={() => handleEdit(facility.id)}>
          수정
        </Button>

        {facility.status === "pending" && (
          <Button variant="success" size="sm" onClick={() => handleStatusChange(facility.id, "approved")}>
            승인
          </Button>
        )}
        {facility.status === "pending" && (
          <Button variant="danger" size="sm" onClick={() => handleStatusChange(facility.id, "rejected")}>
            거부
          </Button>
        )}
        <Button variant="danger" size="sm" onClick={() => handleDelete(facility.id)}>
          삭제
        </Button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {totalFilteredPages > 1 && (
            <div className="admin-pagination">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </Button>

              {[...Array(totalFilteredPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalFilteredPages}
              >
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FacilitiesListPage
