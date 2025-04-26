"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../hooks/use-favorites"
import BottomNavigation from "../components/BottomNavigation"
import { Button } from "../components/ui/Button"
import "../styles/FavoritesPage.css"

/**
 * 찜 목록 페이지 컴포넌트
 *
 * @returns {JSX.Element}
 */
function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)

    // TODO: 백엔드 API 연동 - 사용자가 로그인한 경우 서버에서 찜 목록 가져오기
    // axios.get('/api/favorites')
    //   .then(response => {
    //     // setFavorites(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Failed to fetch favorites', error);
    //     setIsLoading(false);
    //   });
  }, [])

  /**
   * 전체 삭제 처리 함수
   */
  const handleClearAll = () => {
    // TODO: 백엔드 API 연동 - 사용자가 로그인한 경우 서버에서 찜 목록 전체 삭제
    // axios.delete('/api/favorites')
    //   .then(response => {
    //     // 로컬 상태 업데이트
    //   })
    //   .catch(error => console.error('Failed to clear favorites', error));

    alert("전체 삭제 기능은 현재 개발 중입니다.")
  }

  return (
    <div className="favorites-page">
      {/* 헤더 */}
      <header className="page-header">
        <div className="container">
          <Link to="/" className="back-button">
            <i className="icon-chevron-left"></i>
          </Link>
          <h1>찜한 목록</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="page-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="favorites-list">
              <div className="list-header">
                <h2>찜한 시설 ({favorites.length})</h2>
                <Button variant="ghost" size="sm" className="clear-all-button" onClick={handleClearAll}>
                  전체 삭제
                </Button>
              </div>

              {favorites.map((facility) => (
                <div key={facility.id} className="facility-card">
                  <Link to={`/facility/${facility.id}`} className="facility-link">
                    <div className="facility-content">
                      <div className="facility-image">
                        <img src={facility.image || "/placeholder.svg"} alt={facility.name} />
                      </div>
                      <div className="facility-info">
                        <h3>{facility.name}</h3>
                        <p className="facility-address">{facility.address}</p>
                        <div className="facility-tags">
                          {facility.grade && <div className="facility-grade">{facility.grade}</div>}
                          {facility.tags && facility.tags.length > 0 && (
                            <span className="facility-tag">{facility.tags[0]}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="facility-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="delete-button"
                      onClick={() => removeFavorite(facility.id)}
                    >
                      <i className="icon-trash"></i>
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="icon-heart"></i>
              </div>
              <h2>찜한 시설이 없습니다</h2>
              <p>마음에 드는 시설을 찾아 하트 버튼을 눌러보세요.</p>
              <Link to="/search">
                <Button className="search-button">시설 찾아보기</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  )
}

export default FavoritesPage
