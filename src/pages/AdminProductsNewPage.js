"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { Label } from "../components/ui/Label"
import "../styles/AdminProductsNewPage.css"

const AdminProductsNewPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountRate: "",
    category: "",
    description: "",
    stock: "",
    images: [],
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // 미리보기 URL 생성
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setFormData({
      ...formData,
      images: [...formData.images, ...imageFiles],
    })
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]

    // 미리보기 URL 해제
    URL.revokeObjectURL(newImages[index].preview)

    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "제품명을 입력해주세요"
    if (!formData.price.trim()) newErrors.price = "가격을 입력해주세요"
    if (!formData.category) newErrors.category = "카테고리를 선택해주세요"
    if (!formData.description.trim()) newErrors.description = "제품 설명을 입력해주세요"
    if (!formData.stock.trim()) newErrors.stock = "재고 수량을 입력해주세요"
    if (formData.images.length === 0) newErrors.images = "최소 1개 이상의 이미지를 업로드해주세요"

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 백엔드 API 연동 - 제품 등록 API 호출
      // FormData 객체를 사용하여 이미지 파일과 함께 전송
      const productFormData = new FormData()

      // 텍스트 데이터 추가
      productFormData.append("name", formData.name)
      productFormData.append("price", formData.price)
      productFormData.append("discountRate", formData.discountRate || "0")
      productFormData.append("category", formData.category)
      productFormData.append("description", formData.description)
      productFormData.append("stock", formData.stock)

      // 이미지 파일 추가
      formData.images.forEach((image, index) => {
        productFormData.append(`image${index}`, image.file)
      })

      // API 호출 (실제 구현 시 대체)
      console.log("제품 등록 요청:", Object.fromEntries(productFormData))

      // 성공 시 제품 목록 페이지로 이동
      alert("제품이 성공적으로 등록되었습니다.")
      navigate("/admin/products")
    } catch (error) {
      console.error("제품 등록 오류:", error)
      alert("제품 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-products-new-page">
      <div className="admin-header">
        <h1>새 제품 등록</h1>
        <Button onClick={() => navigate("/admin/products")} variant="outline">
          목록으로 돌아가기
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h2>기본 정보</h2>

          <div className="form-group">
            <Label htmlFor="name">제품명 *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="price">가격 (원) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
              />
              {errors.price && <p className="error-text">{errors.price}</p>}
            </div>

            <div className="form-group">
              <Label htmlFor="discountRate">할인율 (%)</Label>
              <Input
                id="discountRate"
                name="discountRate"
                type="number"
                min="0"
                max="100"
                value={formData.discountRate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="category">카테고리 *</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              options={[
                { value: "", label: "카테고리 선택" },
                { value: "mobility", label: "이동 보조" },
                { value: "bathroom", label: "욕실 용품" },
                { value: "bedroom", label: "침실 용품" },
                { value: "daily", label: "일상 생활용품" },
                { value: "medical", label: "의료 용품" },
              ]}
            />
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div className="form-group">
            <Label htmlFor="stock">재고 수량 *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
            />
            {errors.stock && <p className="error-text">{errors.stock}</p>}
          </div>
        </div>

        <div className="form-section">
          <h2>제품 설명</h2>

          <div className="form-group">
            <Label htmlFor="description">상세 설명 *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              error={errors.description}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>
        </div>

        <div className="form-section">
          <h2>제품 이미지</h2>

          <div className="form-group">
            <Label htmlFor="images">이미지 업로드 *</Label>
            <div className="image-upload-container">
              <label className="image-upload-button">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden-input"
                />
                이미지 선택
              </label>
              <span className="help-text">최대 5개까지 업로드 가능합니다.</span>
            </div>
            {errors.images && <p className="error-text">{errors.images}</p>}

            {formData.images.length > 0 && (
              <div className="image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={image.preview || "/placeholder.svg"} alt={`미리보기 ${index + 1}`} />
                    <button type="button" onClick={() => removeImage(index)} className="remove-image-button">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "제품 등록"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminProductsNewPage
