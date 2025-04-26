"use client"

import { useState } from "react"
import koreaRegions from "../data/korea-regions"

const RegionSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState(null)

  if (!isOpen) return null

  const handleProvinceClick = (province) => {
    setSelectedProvince(province)
  }

  const handleCityClick = (city) => {
    onSelect({
      province: selectedProvince.province,
      city: city,
    })
    onClose()
  }

  const handleBackClick = () => {
    setSelectedProvince(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {selectedProvince ? `${selectedProvince.province} 지역 선택` : "지역 선택"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(80vh - 60px)" }}>
          {selectedProvince ? (
            <>
              <button onClick={handleBackClick} className="mb-4 flex items-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"></path>
                </svg>
                뒤로 가기
              </button>

              <div className="grid grid-cols-2 gap-2">
                {selectedProvince.districts.map((district, index) => (
                  <button
                    key={index}
                    onClick={() => handleCityClick(district)}
                    className="p-3 text-left border rounded-md hover:bg-gray-50"
                  >
                    {district}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {koreaRegions.map((province, index) => (
                <button
                  key={index}
                  onClick={() => handleProvinceClick(province)}
                  className="p-3 text-left border rounded-md hover:bg-gray-50"
                >
                  {province.province}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegionSelectorModal
