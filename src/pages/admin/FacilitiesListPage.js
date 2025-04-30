"use client"
import Layout from "../../components/Layout";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import {Eye, Pencil, Trash2} from "lucide-react";
import "../../styles/AdminFacilitiesListPage.css";
import {FaSearch} from "react-icons/fa"

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
                            status: "approved"
                        }, {
                            id: 2,
                            name: "미소요양병원",
                            type: "요양병원",
                            address: "서울시 서초구 서초대로 456",
                            status: "approved"
                        }, {
                            id: 3,
                            name: "푸른실버타운",
                            type: "실버타운",
                            address: "경기도 고양시 일산동구 중앙로 789",
                            status: "approved"
                        }, {
                            id: 4,
                            name: "사랑방문요양센터",
                            type: "방문요양",
                            address: "서울시 송파구 올림픽로 101",
                            status: "pending"
                        }, {
                            id: 5,
                            name: "건강요양원",
                            type: "요양원",
                            address: "경기도 성남시 분당구 판교로 202",
                            status: "approved"
                        }, {
                            id: 6,
                            name: "햇살주야간보호센터",
                            type: "주야간보호",
                            address: "서울시 마포구 와우산로 303",
                            status: "rejected"
                        }, {
                            id: 7,
                            name: "평화요양병원",
                            type: "요양병원",
                            address: "인천시 연수구 센트럴로 404",
                            status: "approved"
                        }, {
                            id: 8,
                            name: "가족방문간호센터",
                            type: "방문간호",
                            address: "서울시 강서구 공항대로 505",
                            status: "pending"
                        }
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

    const filteredFacilities = facilities.filter((facility) => {
        const matchesSearch = facility
            .name
            .includes(searchTerm) || facility
            .address
            .includes(searchTerm);
        const matchesStatus = filterStatus === "all" || facility.status === filterStatus;
        const matchesType = filterType === "all" || facility.type === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    const totalPages = Math.ceil(filteredFacilities.length / 10);
    const currentFacilities = filteredFacilities.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">승인</span>;
            case "pending":
                return <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">대기중</span>;
            case "rejected":
                return <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">거부됨</span>;
            default:
                return <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">알 수 없음</span>;
        }
    };
    
    // 로딩 중 스켈레톤 UI 표시
    if (isLoading) {
        return (
            <Layout>
                <div className="admin-facilities-list max-w-6xl mx-auto px-4">
                    <div className="admin-header">
                        <h1>시설 관리</h1>
                        <Skeleton className="admin-button-skeleton"/>
                    </div>

                    <div className="admin-filters">
                        <Skeleton className="admin-search-skeleton"/>
                        <div className="admin-filter-group">
                            <Skeleton className="admin-filter-skeleton"/>
                            <Skeleton className="admin-filter-skeleton"/>
                        </div>
                    </div>

                    <div className="admin-table-container">
                        <Skeleton className="admin-table-skeleton" height="400px"/>
                    </div>

                    <div className="admin-pagination">
                        <Skeleton className="admin-pagination-skeleton"/>
                    </div>
                </div>
            </Layout>
        )
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

                <div
                    className="admin-filters flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    {/* 검색창 */}
                    <div
                        className="admin-search flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
                        <FaSearch className="text-gray-400 mr-2 w-4 h-4"/>
                        <input
                            type="text"
                            placeholder="시설명 검색"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="outline-none text-sm placeholder-gray-400 bg-transparent"/>
                    </div>

                    {/* 필터 셀렉트 박스 */}
                    <div className="admin-filter-group flex gap-4 mt-2 sm:mt-0">
                        <select
                            value={filterStatus}
                            onChange={handleStatusFilterChange}
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none">
                            <option value="all">모든 상태</option>
                            <option value="approved">승인됨</option>
                            <option value="pending">대기중</option>
                            <option value="rejected">거부됨</option>
                        </select>

                        <select
                            value={filterType}
                            onChange={handleTypeFilterChange}
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none">
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

                {
                    filteredFacilities.length === 0
                        ? (
                            <div className="admin-empty-state">
                                <p>검색 조건에 맞는 시설이 없습니다.</p>
                            </div>
                        )
                        : (
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-4">시설명</th>
                                            <th className="px-6 py-4">유형</th>
                                            <th className="px-6 py-4">주소</th>
                                            <th className="px-6 py-4">상태</th>
                                            <th className="px-6 py-4">관리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentFacilities.map((facility) => (
                                                <tr key={facility.id} className="h-16">
                                                    <td>{facility.name}</td>
                                                    <td>{facility.type}</td>
                                                    <td>{facility.address}</td>
                                                    <td>{getStatusBadge(facility.status)}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-start items-center gap-5">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleViewDetail(facility.id)}>
                                                                <Eye className="w-5 h-5 text-blue-500"/>
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(facility.id)}>
                                                                <Pencil className="w-5 h-5 text-orange-500"/>
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(facility.id)}>
                                                                <Trash2 className="w-5 h-5 text-red-500"/>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

<<<<<<< HEAD
                                {
                                    totalPages > 1 && (
                                        <div className="admin-pagination">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>이전</Button>
                                            {
                                                [...Array(totalPages)].map((_, i) => (
                                                    <Button
                                                        key={i}
                                                        variant={currentPage === i + 1
                                                            ? "default"
                                                            : "outline"}
                                                        size="sm"
                                                        onClick={() => setCurrentPage(i + 1)}>
                                                        {i + 1}
                                                    </Button>
                                                ))
                                            }
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>다음</Button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                }
=======
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
>>>>>>> b0178cdb5ee6190554d60fc05e33bda46384d881
            </div>
        </Layout>
    );
};

export default FacilitiesListPage;
