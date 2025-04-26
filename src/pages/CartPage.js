"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../hooks/use-cart"
import BottomNavigation from "../components/BottomNavigation"
import { Button } from "../components/ui/Button"
import "../styles/CartPage.css"

/**
 * 장바구니 페이지 컴포넌트
 *
 * @returns {JSX.Element}
 */
function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)

    // TODO: 백엔드 API 연동 - 사용자가 로그인한 경우 서버에서 장바구니 가져오기
    // axios.get('/api/cart')
    //   .then(response => {
    //     // setCart(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Failed to fetch cart', error);
    //     setIsLoading(false);
    //   });
  }, [])

  /**
   * 총 금액 계산
   *
   * @returns {number} 총 금액
   */
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number.parseInt(item.price.replace(/[^0-9]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  /**
   * 금액 포맷팅
   *
   * @param {number} price - 포맷팅할 금액
   * @returns {string} 포맷팅된 금액 문자열
   */
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  }

  /**
   * 카카오페이 결제 처리
   */
  const handlePayment = () => {
    // TODO: 백엔드 API 연동 - 카카오페이 결제 요청
    // axios.post('/api/payment/kakao', {
    //   items: cart.map(item => ({
    //     id: item.id,
    //     name: item.name,
    //     quantity: item.quantity,
    //     price: Number.parseInt(item.price.replace(/[^0-9]/g, ""))
    //   })),
    //   totalAmount: calculateTotal()
    // })
    // .then(response => {
    //   // 결제 페이지로 리다이렉트
    //   window.location.href = response.data.redirectUrl;
    // })
    // .catch(error => {
    //   console.error('Payment initiation failed', error);
    //   alert('결제 초기화에 실패했습니다. 다시 시도해주세요.');
    // });

    alert("카카오페이 결제 기능은 현재 개발 중입니다.")
  }

  /**
   * 전체 삭제 처리 함수
   */
  const handleClearAll = () => {
    // TODO: 백엔드 API 연동 - 사용자가 로그인한 경우 서버에서 장바구니 전체 삭제
    // axios.delete('/api/cart')
    //   .then(response => {
    //     // 로컬 상태 업데이트
    //   })
    //   .catch(error => console.error('Failed to clear cart', error));

    alert("전체 삭제 기능은 현재 개발 중입니다.")
  }

  return (
    <div className="cart-page">
      {/* 헤더 */}
      <header className="page-header">
        <div className="container">
          <Link to="/" className="back-button">
            <i className="icon-chevron-left"></i>
          </Link>
          <h1>장바구니</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="page-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : cart.length > 0 ? (
            <div>
              <div className="list-header">
                <h2>장바구니 ({cart.length})</h2>
                <Button variant="ghost" size="sm" className="clear-all-button" onClick={handleClearAll}>
                  전체 삭제
                </Button>
              </div>

              <div className="cart-items">
                {cart.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-content">
                      <div className="product-image">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <Link to={`/products/${product.id}`}>
                          <h3>{product.name}</h3>
                        </Link>
                        <p className="product-price">{product.price}</p>
                        {product.discount && <p className="product-discount">할인: {product.discount}</p>}
                      </div>
                    </div>

                    <div className="product-actions">
                      <div className="quantity-control">
                        <button
                          className="quantity-button"
                          onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                        >
                          <i className="icon-minus"></i>
                        </button>
                        <span className="quantity-value">{product.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        >
                          <i className="icon-plus"></i>
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="delete-button"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <i className="icon-trash"></i>
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 주문 요약 */}
              <div className="order-summary">
                <h3>주문 요약</h3>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>상품 금액</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="summary-item">
                    <span>배송비</span>
                    <span>무료</span>
                  </div>
                </div>
                <div className="summary-total">
                  <span>총 결제 금액</span>
                  <span className="total-price">{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="icon-shopping-cart"></i>
              </div>
              <h2>장바구니가 비어있습니다</h2>
              <p>필요한 제품을 장바구니에 담아보세요.</p>
              <Link to="/products">
                <Button className="shop-button">제품 쇼핑하기</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* 결제 버튼 */}
      {!isLoading && cart.length > 0 && (
        <div className="payment-bar">
          <Button onClick={handlePayment} className="payment-button">
            <i className="icon-credit-card"></i>
            카카오페이로 결제하기
          </Button>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  )
}

export default CartPage
