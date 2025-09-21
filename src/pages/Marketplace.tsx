import React, { useState, useMemo } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import CropCard from '../components/CropCard'
import { mockCrops } from '../data/mockData'

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    priceRange: { min: '', max: '' },
    quality: '',
    organic: false
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  const filteredCrops = useMemo(() => {
    return mockCrops.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crop.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLocation = !filters.location || crop.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const matchesPrice = (!filters.priceRange.min || crop.price >= Number(filters.priceRange.min)) &&
                          (!filters.priceRange.max || crop.price <= Number(filters.priceRange.max))
      
      const matchesQuality = !filters.quality || crop.quality === filters.quality
      
      const matchesOrganic = !filters.organic || crop.organic === filters.organic
      
      return matchesSearch && matchesLocation && matchesPrice && matchesQuality && matchesOrganic
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.farmer.rating - a.farmer.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [searchTerm, filters, sortBy])

  const handleAddToCart = (crop: any) => {
    console.log('Added to cart:', crop.name)
    // Here you would typically add to cart state or call an API
  }

  const handleOrderNow = (crop: any) => {
    console.log('Order now:', crop.name)
    // Here you would typically show order confirmation modal
    alert(`Order placed for ${crop.name} from ${crop.farmer.name}!`)
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: { min: '', max: '' },
      quality: '',
      organic: false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover fresh crops from verified farmers across India</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" /> */}
              <input
                type="text"
                placeholder="Search crops, farmers, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* <FunnelIcon className="h-5 w-5 mr-2" /> */}
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    {/* <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: {...filters.priceRange, min: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: {...filters.priceRange, max: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Quality Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality Grade
                  </label>
                  <select
                    value={filters.quality}
                    onChange={(e) => setFilters({...filters, quality: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Grades</option>
                    <option value="A">Grade A</option>
                    <option value="B">Grade B</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>

                {/* Organic Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="organic"
                      checked={filters.organic}
                      onChange={(e) => setFilters({...filters, organic: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                      Organic Only
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All Filters
                </button>
                <div className="text-sm text-gray-500">
                  {filteredCrops.length} crops found
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredCrops.length} Crops Available
            </h2>
            <div className="flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">
                {searchTerm && `Search results for "${searchTerm}"`}
              </span>
            </div>
          </div>
        </div>

        {/* Crop Grid */}
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onAddToCart={handleAddToCart}
                onOrderNow={handleOrderNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No crops found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredCrops.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Load More Crops
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace
