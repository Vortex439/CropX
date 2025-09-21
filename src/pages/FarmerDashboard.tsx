import React, { useState } from 'react'
import { 
  HomeIcon, 
  PlusIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PhotoIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import DashboardCard from '../components/DashboardCard'
import ChatBox from '../components/ChatBox'
import { mockOrders } from '../data/mockData'

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddCrop, setShowAddCrop] = useState(false)
  const [cropForm, setCropForm] = useState({
    name: '',
    quantity: '',
    price: '',
    location: '',
    description: '',
    organic: false
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [aiQuality, setAiQuality] = useState<string | null>(null)

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'add-crop', name: 'Add Crop', icon: PlusIcon },
    { id: 'orders', name: 'My Orders', icon: ShoppingBagIcon },
    { id: 'earnings', name: 'Earnings', icon: CurrencyDollarIcon },
    { id: 'chatbot', name: 'AI Assistant', icon: ChatBubbleLeftRightIcon },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        // Simulate AI quality check
        setTimeout(() => {
          const qualities = ['A', 'B', 'C']
          const randomQuality = qualities[Math.floor(Math.random() * qualities.length)]
          setAiQuality(randomQuality)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitCrop = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Crop submitted:', cropForm)
    // Reset form
    setCropForm({
      name: '',
      quantity: '',
      price: '',
      location: '',
      description: '',
      organic: false
    })
    setUploadedImage(null)
    setAiQuality(null)
    setShowAddCrop(false)
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'B':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'C':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Crops Listed"
                value="12"
                icon={<PlusIcon className="h-6 w-6" />}
                color="primary"
                trend={{ value: 15, isPositive: true }}
              />
              <DashboardCard
                title="Active Orders"
                value="8"
                icon={<ShoppingBagIcon className="h-6 w-6" />}
                color="accent"
                trend={{ value: 25, isPositive: true }}
              />
              <DashboardCard
                title="Total Earnings"
                value="₹45,600"
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
                color="success"
                trend={{ value: 30, isPositive: true }}
              />
              <DashboardCard
                title="Average Rating"
                value="4.8"
                icon={<CheckCircleIcon className="h-6 w-6" />}
                color="warning"
                subtitle="Based on 156 reviews"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockOrders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.cropName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.quantity} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'add-crop':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Crop</h3>
              <button
                onClick={() => setShowAddCrop(true)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Crop
              </button>
            </div>

            {showAddCrop && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Crop</h3>
                    <button
                      onClick={() => setShowAddCrop(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitCrop} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Crop Name
                        </label>
                        <input
                          type="text"
                          value={cropForm.name}
                          onChange={(e) => setCropForm({...cropForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity (kg)
                        </label>
                        <input
                          type="number"
                          value={cropForm.quantity}
                          onChange={(e) => setCropForm({...cropForm, quantity: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price per kg (₹)
                        </label>
                        <input
                          type="number"
                          value={cropForm.price}
                          onChange={(e) => setCropForm({...cropForm, price: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={cropForm.location}
                          onChange={(e) => setCropForm({...cropForm, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={cropForm.description}
                        onChange={(e) => setCropForm({...cropForm, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Crop Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          Choose Image
                        </label>
                        {uploadedImage && (
                          <div className="mt-4">
                            <img
                              src={uploadedImage}
                              alt="Crop preview"
                              className="w-32 h-32 object-cover rounded-lg mx-auto"
                            />
                            {aiQuality && (
                              <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getQualityColor(aiQuality)}`}>
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                AI Quality: Grade {aiQuality}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="organic"
                        checked={cropForm.organic}
                        onChange={(e) => setCropForm({...cropForm, organic: e.target.checked})}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                        This crop is organic
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowAddCrop(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Add Crop
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="text-center text-gray-500 py-12">
              <PhotoIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>No crops added yet. Click "Add Crop" to get started!</p>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.cropName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.buyer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.quantity} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{order.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'earnings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="This Month"
                value="₹12,500"
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
                color="success"
                trend={{ value: 20, isPositive: true }}
              />
              <DashboardCard
                title="Last Month"
                value="₹10,400"
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
                color="primary"
              />
              <DashboardCard
                title="Total Earnings"
                value="₹45,600"
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
                color="accent"
                trend={{ value: 35, isPositive: true }}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
              <div className="space-y-4">
                {[
                  { month: 'January 2024', amount: '₹12,500', orders: 8 },
                  { month: 'December 2023', amount: '₹10,400', orders: 6 },
                  { month: 'November 2023', amount: '₹8,900', orders: 5 },
                  { month: 'October 2023', amount: '₹7,200', orders: 4 },
                ].map((earning, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{earning.month}</div>
                      <div className="text-sm text-gray-500">{earning.orders} orders</div>
                    </div>
                    <div className="text-lg font-semibold text-primary-600">{earning.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'chatbot':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Farming Assistant</h3>
            <ChatBox />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Farmer Dashboard</h2>
          </div>
          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard
