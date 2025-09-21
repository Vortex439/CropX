import React, { useState } from 'react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import DashboardCard from '../components/DashboardCard'
import { mockFarmers, mockBuyers, mockOrders } from '../data/mockData'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedUser, setSelectedUser] = useState<{ type: 'farmer' | 'buyer', id: string } | null>(null)

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'farmers', name: 'Farmers', icon: UserGroupIcon },
    { id: 'buyers', name: 'Buyers', icon: UserGroupIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  ]

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.price, 0)
  const totalOrders = mockOrders.length
  const totalFarmers = mockFarmers.length
  const totalBuyers = mockBuyers.length

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Revenue"
                value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
                color="success"
                trend={{ value: 25, isPositive: true }}
              />
              <DashboardCard
                title="Total Orders"
                value={totalOrders.toString()}
                icon={<ShoppingBagIcon className="h-6 w-6" />}
                color="primary"
                trend={{ value: 18, isPositive: true }}
              />
              <DashboardCard
                title="Active Farmers"
                value={totalFarmers.toString()}
                icon={<UserGroupIcon className="h-6 w-6" />}
                color="accent"
                trend={{ value: 12, isPositive: true }}
              />
              <DashboardCard
                title="Registered Buyers"
                value={totalBuyers.toString()}
                icon={<UserGroupIcon className="h-6 w-6" />}
                color="warning"
                trend={{ value: 8, isPositive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{order.cropName}</div>
                        <div className="text-sm text-gray-500">{order.farmer} → {order.buyer}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{order.price}</div>
                        <div className="text-sm text-gray-500">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Farmers</h3>
                <div className="space-y-4">
                  {mockFarmers.slice(0, 5).map((farmer) => (
                    <div key={farmer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{farmer.name}</div>
                        <div className="text-sm text-gray-500">{farmer.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{farmer.rating}⭐</div>
                        <div className="text-sm text-gray-500">{farmer.totalCrops} crops</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'farmers':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Farmers Management</h3>
              <div className="text-sm text-gray-500">
                {mockFarmers.length} farmers registered
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crops
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockFarmers.map((farmer) => (
                    <tr key={farmer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{farmer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="ml-1 text-sm font-medium">{farmer.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {farmer.totalCrops}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(farmer.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedUser({ type: 'farmer', id: farmer.id })}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'buyers':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Buyers Management</h3>
              <div className="text-sm text-gray-500">
                {mockBuyers.length} buyers registered
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBuyers.map((buyer) => (
                    <tr key={buyer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{buyer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {buyer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {buyer.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {buyer.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(buyer.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedUser({ type: 'buyer', id: buyer.id })}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Orders Management</h3>
              <div className="text-sm text-gray-500">
                {mockOrders.length} total orders
              </div>
            </div>
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
                      Farmer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buyer
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
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
                        {order.farmer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.buyer}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-700">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Revenue Growth"
                value="+25%"
                icon={<ChartBarIcon className="h-6 w-6" />}
                color="success"
                trend={{ value: 25, isPositive: true }}
              />
              <DashboardCard
                title="Order Completion Rate"
                value="94%"
                icon={<ShoppingBagIcon className="h-6 w-6" />}
                color="primary"
                trend={{ value: 5, isPositive: true }}
              />
              <DashboardCard
                title="User Satisfaction"
                value="4.7/5"
                icon={<UserGroupIcon className="h-6 w-6" />}
                color="accent"
                trend={{ value: 8, isPositive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
                <div className="space-y-4">
                  {[
                    { month: 'January 2024', revenue: '₹2.5L', growth: '+15%' },
                    { month: 'December 2023', revenue: '₹2.1L', growth: '+8%' },
                    { month: 'November 2023', revenue: '₹1.9L', growth: '+12%' },
                    { month: 'October 2023', revenue: '₹1.7L', growth: '+5%' },
                  ].map((data, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{data.month}</div>
                        <div className="text-sm text-green-600">{data.growth}</div>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{data.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Crops</h3>
                <div className="space-y-4">
                  {[
                    { crop: 'Tomatoes', orders: 45, revenue: '₹90,000' },
                    { crop: 'Onions', orders: 38, revenue: '₹57,000' },
                    { crop: 'Wheat', orders: 32, revenue: '₹80,000' },
                    { crop: 'Potatoes', orders: 28, revenue: '₹33,600' },
                  ].map((data, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{data.crop}</div>
                        <div className="text-sm text-gray-500">{data.orders} orders</div>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{data.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
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

export default AdminDashboard
