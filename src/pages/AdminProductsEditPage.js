"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { Label } from "../components/ui/Label"
import "../styles/AdminProductsEditPage.css"

const AdminProductsEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "",
    description: "",
    stock: "",
    images: [],
  })
  const [imageFiles, setImageFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    // TODO: 백엔드 API 연동 - 제품 상세 정보 가져오기
    const fetchProductData = async () => {
      try {
        setIsLoading(true)
        // 실제 구현 시 아래 코드를 API 호출로 대체
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error("제품 정보를 불러오는데 실패했습니다.")
        }
        const data = await response.json()

        setFormData({
          name: data.name,
          price: data.price,
          discountPrice: data.discountPrice || "",
          category: data.category,
          description: data.description,
          stock: data.stock,
          images: data.images || [],
        })

        // 기존 이미지 미리보기 설정
        setPreviewImages(data.images || [])

        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchProductData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles([...imageFiles, ...files])

    // 이미지 미리보기 생성
    const newPreviewImages = files.map((file) => URL.createObjectURL(file))
    setPreviewImages([...previewImages, ...newPreviewImages])
  }

  const removeImage = (index) => {
    // 기존 이미지인지 새로 추가된 이미지인지 확인
    const isExistingImage = index < formData.images.length

    if (isExistingImage) {
      // 기존 이미지 제거
      const updatedImages = [...formData.images]
      updatedImages.splice(index, 1)
      setFormData({
        ...formData,
        images: updatedImages,
      })
    } else {
      // 새로 추가된 이미지 제거
      const newIndex = index - formData.images.length
      const updatedImageFiles = [...imageFiles]
      updatedImageFiles.splice(newIndex, 1)
      setImageFiles(updatedImageFiles)
    }

    // 미리보기 이미지 제거
    const updatedPreviews = [...previewImages]
    updatedPreviews.splice(index, 1)
    setPreviewImages(updatedPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // TODO: 백엔드 API 연동 - 제품 정보 업데이트
      // 이미지 파일 업로드 처리
      const formDataToSend = new FormData()
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file)
      })

      // 기존 이미지 정보 추가
      formDataToSend.append("existingImages", JSON.stringify(formData.images))

      // 제품 정보 추가
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          formDataToSend.append(key, formData[key])
        }
      })

      // 실제 구현 시 아래 코드를 API 호출로 대체
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("제품 정보 업데이트에 실패했습니다.")
      }

      alert("제품 정보가 성공적으로 업데이트되었습니다.")
      navigate("/admin/products")
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 제품을 삭제하시겠습니까?")) {
      return
    }

    try {
      setIsLoading(true)

      // TODO: 백엔드 API 연동 - 제품 삭제
      // 실제 구현 시 아래 코드를 API 호출로 대체
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("제품 삭제에 실패했습니다.")
      }

      alert("제품이 성공적으로 삭제되었습니다.")
      navigate("/admin/products")
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="admin-products-edit-loading">로딩 중...</div>
  }

  if (error) {
    return <div className="admin-products-edit-error">오류: {error}</div>
  }

  return (
    <div className="admin-products-edit-container">
      <h1 className="admin-products-edit-title">제품 수정</h1>

      <form onSubmit={handleSubmit} className="admin-products-edit-form">
        <div className="form-group">
          <Label htmlFor="name">제품명</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <Label htmlFor="price">가격 (원)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <Label htmlFor="discountPrice">할인가 (원, 선택사항)</Label>
            <Input
              id="discountPrice"
              name="discountPrice"
              type="number"
              value={formData.discountPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <Label htmlFor="category">카테고리</Label>
            <Select id="category" name="category" value={formData.category} onChange={handleChange} required>
              <option value="">카테고리 선택</option>
              <option value="mobility">이동 보조</option>
              <option value="bathroom">욕실 용품</option>
              <option value="bedroom">침실 용품</option>
              <option value="daily">일상 생활 용품</option>
              <option value="medical">의료 용품</option>
            </Select>
          </div>

          <div className="form-group">
            <Label htmlFor="stock">재고 수량</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <Label htmlFor="description">제품 설명</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="images">제품 이미지</Label>
          <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} />
          <p className="image-help-text">이미지는 최대 5개까지 업로드 가능합니다.</p>

          <div className="image-preview-container">
            {previewImages.map((src, index) => (
              <div key={index} className="image-preview-item">
                <img src={src || "/placeholder.svg"} alt={`제품 이미지 ${index + 1}`} />
                <button type="button" className="remove-image-btn" onClick={() => removeImage(index)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
            취소
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            제품 삭제
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminProductsEditPage
