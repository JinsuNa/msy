"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../../../src/styles/AdminSalesManagementPage.css"

const SalesManagementPage = () => {
  // 주문 상태 옵션
  const orderStatusOptions = [
    { value: "all", label: "전체" },
    { value: "pending", label: "결제완료" },
    { value: "processing", label: "상품준비중" },
    { value: "shipping", label: "배송중" },
    { value: "delivered", label: "배송완료" },
    { value: "cancelled", label: "취소" },
    { value: "refunded", label: "환불" },
  ]

  // 결제 방법 옵션
  const paymentMethodOptions = [
    { value: "all", label: "전체" },
    { value: "card", label: "신용카드" },
    { value: "bank", label: "계좌이체" },
    { value: "vbank", label: "가상계좌" },
    { value: "phone", label: "휴대폰결제" },
    { value: "kakao", label: "카카오페이" },
    { value: "naver", label: "네이버페이" },
  ]

  // 기간 옵션
  const periodOptions = [
    { value: "today", label: "오늘" },
    { value: "week", label: "1주일" },
    { value: "month", label: "1개월" },
    { value: "3months", label: "3개월" },
    { value: "6months", label: "6개월" },
    { value: "year", label: "1년" },
    { value: "custom", label: "직접입력" },
  ]

  // 상태 관리
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("orderNumber")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [salesSummary, setSalesSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    pendingShipments: 0,
    cancelledOrders: 0,
    refundedOrders: 0,
  })

  // 더미 데이터 생성
  useEffect(() => {
    const generateDummyOrders = () => {
      const products = [
        { id: 1, name: "전동 침대", price: 1200000, image: "/modern-hospital-bed.png" },
        { id: 2, name: "목욕 의자", price: 150000, image: "/accessible-bathroom-chair.png" },
        { id: 3, name: "고급 지팡이", price: 85000, image: "/carved-wooden-cane.png" },
        { id: 4, name: "보행 보조기", price: 230000, image: "/weathered-walker-close-up.png" },
      ]

      const users = [
        {
          id: 1,
          name: "김영희",
          email: "kim@example.com",
          phone: "010-1234-5678",
          address: "서울시 강남구 테헤란로 123",
        },
        {
          id: 2,
          name: "이철수",
          email: "lee@example.com",
          phone: "010-2345-6789",
          address: "서울시 서초구 서초대로 456",
        },
        {
          id: 3,
          name: "박지민",
          email: "park@example.com",
          phone: "010-3456-7890",
          address: "서울시 송파구 올림픽로 789",
        },
        {
          id: 4,
          name: "최수진",
          email: "choi@example.com",
          phone: "010-4567-8901",
          address: "서울시 마포구 홍대로 101",
        },
        {
          id: 5,
          name: "정민수",
          email: "jung@example.com",
          phone: "010-5678-9012",
          address: "서울시 용산구 이태원로 202",
        },
      ]

      const statuses = ["pending", "processing", "shipping", "delivered", "cancelled", "refunded"]
      const paymentMethods = ["card", "bank", "vbank", "phone", "kakao", "naver"]

      const dummyOrders = []

      // 현재 날짜
      const now = new Date()

      // 100개의 더미 주문 생성
      for (let i = 1; i <= 100; i++) {
        // 랜덤 날짜 (최근 6개월 내)
        const orderDate = new Date(now)
        orderDate.setDate(now.getDate() - Math.floor(Math.random() * 180))

        // 랜덤 사용자
        const user = users[Math.floor(Math.random() * users.length)]

        // 랜덤 상품 (1~3개)
        const orderProducts = []
        const numProducts = Math.floor(Math.random() * 3) + 1
        const usedProductIds = new Set()

        for (let j = 0; j < numProducts; j++) {
          let randomProduct
          do {
            randomProduct = products[Math.floor(Math.random() * products.length)]
          } while (usedProductIds.has(randomProduct.id))

          usedProductIds.add(randomProduct.id)

          const quantity = Math.floor(Math.random() * 2) + 1
          orderProducts.push({
            ...randomProduct,
            quantity,
            subtotal: randomProduct.price * quantity,
          })
        }

        // 총 금액 계산
        const totalAmount = orderProducts.reduce((sum, product) => sum + product.subtotal, 0)

        // 랜덤 상태 및 결제 방법
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

        // 주문번호 생성 (날짜 + 순번)
        const orderNumber = `ORD-${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, "0")}${String(orderDate.getDate()).padStart(2, "0")}-${String(i).padStart(4, "0")}`

        dummyOrders.push({
          id: i,
          orderNumber,
          orderDate,
          user,
          products: orderProducts,
          totalAmount,
          status,
          paymentMethod,
          shippingInfo: {
            trackingNumber:
              status === "shipping" || status === "delivered" ? `TRK${Math.floor(Math.random() * 10000000)}` : null,
            carrier: "우체국택배",
            estimatedDelivery: status === "shipping" ? new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000) : null,
          },
        })
      }

      return dummyOrders
    }

    const dummyOrders = generateDummyOrders()
    setOrders(dummyOrders)
    setFilteredOrders(dummyOrders)

    // 판매 요약 정보 계산
    const totalSales = dummyOrders.reduce(
      (sum, order) => (order.status !== "cancelled" && order.status !== "refunded" ? sum + order.totalAmount : sum),
      0,
    )

    const validOrders = dummyOrders.filter((order) => order.status !== "cancelled" && order.status !== "refunded")

    const pendingShipments = dummyOrders.filter(
      (order) => order.status === "pending" || order.status === "processing",
    ).length

    const cancelledOrders = dummyOrders.filter((order) => order.status === "cancelled").length

    const refundedOrders = dummyOrders.filter((order) => order.status === "refunded").length

    setSalesSummary({
      totalSales,
      totalOrders: validOrders.length,
      averageOrderValue: validOrders.length > 0 ? totalSales / validOrders.length : 0,
      pendingShipments,
      cancelledOrders,
      refundedOrders,
    })
  }, [])

  // 필터링 함수
  useEffect(() => {
    let result = [...orders]

    // 상태 필터링
    if (selectedStatus !== "all") {
      result = result.filter((order) => order.status === selectedStatus)
    }

    // 결제 방법 필터링
    if (selectedPayment !== "all") {
      result = result.filter((order) => order.paymentMethod === selectedPayment)
    }

    // 기간 필터링
    const today = new Date()
    let periodStartDate

    switch (selectedPeriod) {
      case "today":
        periodStartDate = new Date(today)
        periodStartDate.setHours(0, 0, 0, 0)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "week":
        periodStartDate = new Date(today)
        periodStartDate.setDate(today.getDate() - 7)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "month":
        periodStartDate = new Date(today)
        periodStartDate.setMonth(today.getMonth() - 1)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "3months":
        periodStartDate = new Date(today)
        periodStartDate.setMonth(today.getMonth() - 3)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "6months":
        periodStartDate = new Date(today)
        periodStartDate.setMonth(today.getMonth() - 6)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "year":
        periodStartDate = new Date(today)
        periodStartDate.setFullYear(today.getFullYear() - 1)
        result = result.filter((order) => order.orderDate >= periodStartDate)
        break
      case "custom":
        if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999) // 종료일 끝까지 포함
          result = result.filter((order) => order.orderDate >= start && order.orderDate <= end)
        }
        break
      default:
        break
    }

    // 검색어 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      switch (searchType) {
        case "orderNumber":
          result = result.filter((order) => order.orderNumber.toLowerCase().includes(term))
          break
        case "userName":
          result = result.filter((order) => order.user.name.toLowerCase().includes(term))
          break
        case "userPhone":
          result = result.filter((order) => order.user.phone.toLowerCase().includes(term))
          break
        case "productName":
          result = result.filter((order) => order.products.some((product) => product.name.toLowerCase().includes(term)))
          break
        default:
          break
      }
    }

    setFilteredOrders(result)
    setCurrentPage(1) // 필터링 후 첫 페이지로 이동
  }, [orders, selectedStatus, selectedPayment, selectedPeriod, startDate, endDate, searchTerm, searchType])

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // 주문 상태 변경 핸들러
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
  }

  // 배송 정보 업데이트 핸들러
  const handleShippingUpdate = (orderId, trackingNumber, carrier) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "shipping",
              shippingInfo: {
                ...order.shippingInfo,
                trackingNumber,
                carrier,
                estimatedDelivery: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
              },
            }
          : order,
      ),
    )
  }

  // 주문 상태에 따른 배지 색상
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-blue"
      case "processing":
        return "badge-purple"
      case "shipping":
        return "badge-orange"
      case "delivered":
        return "badge-green"
      case "cancelled":
        return "badge-red"
      case "refunded":
        return "badge-gray"
      default:
        return "badge-default"
    }
  }

  // 주문 상태 한글 변환
  const getStatusInKorean = (status) => {
    switch (status) {
      case "pending":
        return "결제완료"
      case "processing":
        return "상품준비중"
      case "shipping":
        return "배송중"
      case "delivered":
        return "배송완료"
      case "cancelled":
        return "취소"
      case "refunded":
        return "환불"
      default:
        return status
    }
  }

  // 결제 방법 한글 변환
  const getPaymentMethodInKorean = (method) => {
    switch (method) {
      case "card":
        return "신용카드"
      case "bank":
        return "계좌이체"
      case "vbank":
        return "가상계좌"
      case "phone":
        return "휴대폰결제"
      case "kakao":
        return "카카오페이"
      case "naver":
        return "네이버페이"
      default:
        return method
    }
  }

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  }

  // 금액 포맷 함수
  const formatCurrency = (amount) => {
    return amount.toLocaleString("ko-KR") + "원"
  }

  return (
    <div className="admin-sales-management">
      <h1>판매 현황 관리</h1>

      {/* 판매 요약 정보 */}
      <div className="sales-summary">
        <div className="summary-card">
          <h3>총 매출</h3>
          <p className="summary-value">{formatCurrency(salesSummary.totalSales)}</p>
        </div>
        <div className="summary-card">
          <h3>총 주문 수</h3>
          <p className="summary-value">{salesSummary.totalOrders}건</p>
        </div>
        <div className="summary-card">
          <h3>평균 주문 금액</h3>
          <p className="summary-value">{formatCurrency(salesSummary.averageOrderValue)}</p>
        </div>
        <div className="summary-card">
          <h3>배송 대기</h3>
          <p className="summary-value">{salesSummary.pendingShipments}건</p>
        </div>
        <div className="summary-card">
          <h3>취소 주문</h3>
          <p className="summary-value">{salesSummary.cancelledOrders}건</p>
        </div>
        <div className="summary-card">
          <h3>환불 주문</h3>
          <p className="summary-value">{salesSummary.refundedOrders}건</p>
        </div>
      </div>

      {/* 필터링 옵션 */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>주문 상태</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              {orderStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>결제 방법</label>
            <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
              {paymentMethodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>기간</label>
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {selectedPeriod === "custom" && (
            <div className="date-range">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span>~</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          )}
        </div>

        <div className="filter-row">
          <div className="search-group">
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="orderNumber">주문번호</option>
              <option value="userName">주문자명</option>
              <option value="userPhone">연락처</option>
              <option value="productName">상품명</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">검색</button>
          </div>

          <div className="items-per-page">
            <label>표시 개수</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={50}>50개</option>
              <option value={100}>100개</option>
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 테이블 */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>주문일시</th>
              <th>주문자</th>
              <th>상품정보</th>
              <th>결제방법</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{formatDate(order.orderDate)}</td>
                  <td>
                    <div className="user-info">
                      <div>{order.user.name}</div>
                      <div>{order.user.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          {product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="product-thumbnail"
                            />
                          )}
                          <div className="product-details">
                            <div>{product.name}</div>
                            <div>
                              {formatCurrency(product.price)} x {product.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="total-amount">총 {formatCurrency(order.totalAmount)}</div>
                    </div>
                  </td>
                  <td>{getPaymentMethodInKorean(order.paymentMethod)}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {getStatusInKorean(order.status)}
                    </span>
                    {order.status === "shipping" && order.shippingInfo.trackingNumber && (
                      <div className="tracking-info">
                        <div>운송장: {order.shippingInfo.trackingNumber}</div>
                        <div>택배사: {order.shippingInfo.carrier}</div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/sales/order/${order.id}`} className="view-button">
                        상세보기
                      </Link>
                      {order.status === "pending" && (
                        <button className="process-button" onClick={() => handleStatusChange(order.id, "processing")}>
                          상품준비
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button
                          className="ship-button"
                          onClick={() => {
                            const trackingNumber = prompt("운송장 번호를 입력하세요:")
                            const carrier = prompt("택배사를 입력하세요:", "우체국택배")
                            if (trackingNumber) {
                              handleShippingUpdate(order.id, trackingNumber, carrier || "우체국택배")
                            }
                          }}
                        >
                          배송시작
                        </button>
                      )}
                      {order.status === "shipping" && (
                        <button className="complete-button" onClick={() => handleStatusChange(order.id, "delivered")}>
                          배송완료
                        </button>
                      )}
                      {(order.status === "pending" || order.status === "processing") && (
                        <button
                          className="cancel-button"
                          onClick={() => {
                            if (window.confirm("이 주문을 취소하시겠습니까?")) {
                              handleStatusChange(order.id, "cancelled")
                            }
                          }}
                        >
                          취소
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-orders">
                  주문 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {filteredOrders.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="pagination-button">
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <button
                key={i}
                onClick={() => handlePageChange(pageNum)}
                className={`pagination-button ${currentPage === pageNum ? "active" : ""}`}
              >
                {pageNum}
              </button>
            )
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &gt;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  )
}

export default SalesManagementPage
