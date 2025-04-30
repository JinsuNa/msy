"use client";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "../../styles/AdminFacilitiesListPage.css";
import { FaSearch } from "react-icons/fa";

// 날짜 포맷 함수 예시 (임시로 넣음)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR");
};

const FacilitiesListPage = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setTimeout(() => {
          const dummyFacilities = [
            {
              id: 1,
              name: "행복요양원",
              type: "요양원",
              address: "서울시 강남구 테헤란로 123",
              status: "approved",
              phone: "02-123-4567",
              rating: 4.2,
              reviewCount: 10,
              createdAt: "2023-05-01",
            },
            {
              id: 2,
              name: "미소요양병원",
              type: "요양병원",
              address: "서울시 서초구 서초대로 456",
              status: "approved",
              phone: "02-234-5678",
              rating: 4.0,
              reviewCount: 8,
              createdAt: "2023-06-10",
            },
            {
              id: 3,
              name: "푸른실버타운",
              type: "실버타운",
              address: "경기도 고양시 일산동구 중앙로 789",
              status: "approved",
              phone: "031-345-6789",
              rating: 3.8,
              reviewCount: 12,
              createdAt: "2023-07-15",
            },
          ];
          setFacilities(dummyFacilities);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("시설 목록 로드 중 오류 발생:", error);
        setIsLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const handleViewDetail = (id) => navigate(`/admin/facilities/${id}`);
  const handleEdit = (id) => navigate(`/admin/facilities/${id}/edit`);
  const handleDelete = (id) => {
    if (window.confirm("정말로 이 시설을 삭제하시겠습니까?")) {
      setFacilities(facilities.filter((facility) => facility.id !== id));
    }
  };
  const handleAddNewFacility = () => navigate("/admin/facilities/new");
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e) => setFilterStatus(e.target.value);
  const handleTypeFilterChange = (e) => setFilterType(e.target.value);
  const handleStatusChange = (id, newStatus) => {
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: newStatus } : f
      )
    );
  };
  const handlePageChange = (page) => setCurrentPage(page);

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.includes(searchTerm) ||
      facility.address.includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || facility.status === filterStatus;
    const matchesType = filterType === "all" || facility.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalFilteredPages = Math.ceil(filteredFacilities.length / 10);
  const currentFacilities = filteredFacilities.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="badge green">승인</span>
        );
      case "pending":
        return (
          <span className="badge yellow">대기중</span>
        );
      case "rejected":
        return (
          <span className="badge red">거부됨</span>
        );
      default:
        return (
          <span className="badge gray">알 수 없음</span>
        );
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="admin-facilities-list max-w-6xl mx-auto px-4">
          <div className="admin-header">
            <h1>시설 관리</h1>
            <Skeleton className="admin-button-skeleton" />
          </div>
          <Skeleton className="admin-search-skeleton" />
          <Skeleton className="admin-table-skeleton" height="400px" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="admin-facilities-list max-w-6xl mx-auto px-4">
        <div className="admin-header">
          <h1>시설 관리</h1>
          <Button variant="primary" onClick={handleAddNewFacility}>
            새 시설 등록
          </Button>
        </div>

        <div className="admin-filters flex gap-4 my-4">
          <div className="admin-search flex items-center border px-3 py-2 rounded-md">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="시설명 또는 주소로 검색"
              className="outline-none bg-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            className="admin-filter-select"
          >
            <option value="all">모든 상태</option>
            <option value="approved">승인됨</option>
            <option value="pending">대기중</option>
            <option value="rejected">거부됨</option>
          </select>

          <select
            value={filterType}
            onChange={handleTypeFilterChange}
            className="admin-filter-select"
          >
            <option value="all">모든 유형</option>
            <option value="요양원">요양원</option>
            <option value="요양병원">요양병원</option>
            <option value="실버타운">실버타운</option>
            <option value="방문요양">방문요양</option>
            <option value="방문간호">방문간호</option>
            <option value="주야간보호">주야간보호</option>
          </select>
        </div>

        {currentFacilities.length === 0 ? (
          <p>검색 조건에 맞는 시설이 없습니다.</p>
        ) : (
          <>
            <table className="admin-table w-full text-left border-collapse">
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
                    <td>{facility.phone || "-"}</td>
                    <td>{getStatusBadge(facility.status)}</td>
                    <td>
                      {facility.status === "approved"
                        ? `${facility.rating} (${facility.reviewCount})`
                        : "-"}
                    </td>
                    <td>{formatDate(facility.createdAt)}</td>
                    <td className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(facility.id)}>수정</Button>
                      {facility.status === "pending" && (
                        <>
                          <Button size="sm" variant="success" onClick={() => handleStatusChange(facility.id, "approved")}>승인</Button>
                          <Button size="sm" variant="danger" onClick={() => handleStatusChange(facility.id, "rejected")}>거부</Button>
                        </>
                      )}
                      <Button size="sm" variant="danger" onClick={() => handleDelete(facility.id)}>삭제</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalFilteredPages > 1 && (
              <div className="admin-pagination flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  이전
                </Button>
                {Array.from({ length: totalFilteredPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalFilteredPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  다음
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default FacilitiesListPage;
