import React from 'react'
import { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
  trend
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary-600'
      case 'secondary':
        return 'bg-secondary-50 text-secondary-600'
      case 'accent':
        return 'bg-accent-50 text-accent-600'
      case 'success':
        return 'bg-green-50 text-green-600'
      case 'warning':
        return 'bg-yellow-50 text-yellow-600'
      case 'danger':
        return 'bg-red-50 text-red-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
