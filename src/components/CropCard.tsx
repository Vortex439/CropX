import React from 'react'
import { Crop } from '../data/mockData'
import { StarIcon, MapPinIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

interface CropCardProps {
  crop: Crop
  onAddToCart?: (crop: Crop) => void
  onOrderNow?: (crop: Crop) => void
  showActions?: boolean
}

const CropCard: React.FC<CropCardProps> = ({ 
  crop, 
  onAddToCart, 
  onOrderNow, 
  showActions = true 
}) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A':
        return 'bg-green-100 text-green-800'
      case 'B':
        return 'bg-yellow-100 text-yellow-800'
      case 'C':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover"
        />
        {crop.organic && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            🌱 Organic
          </div>
        )}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${getQualityColor(crop.quality)}`}>
          Grade {crop.quality}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {crop.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <StarIcon className="h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{crop.farmer.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {crop.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{crop.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ₹{crop.price}
            </span>
            <span className="text-gray-500 text-sm">/{crop.unit}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Available</div>
            <div className="font-semibold text-gray-900">
              {crop.quantity} {crop.unit}
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span>Farmer: </span>
          <span className="font-medium ml-1">{crop.farmer.name}</span>
          <CheckBadgeIcon className="h-4 w-4 text-blue-500 ml-1" />
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={() => onAddToCart?.(crop)}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onOrderNow?.(crop)}
              className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CropCard
