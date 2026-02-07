import { useState } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiBarChart2, FiDollarSign, FiUsers } from 'react-icons/fi'
import Button from '../../components/Common/Button.jsx'
import Modal from '../../components/Common/Modal.jsx'
import { vendorService } from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'


const VendorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [services, setServices] = useState([
    { id: 1, name: 'Hotel Room Cleaning', price: 89, bookings: 24, status: 'Active' },
    { id: 2, name: 'Restaurant Catering', price: 299, bookings: 12, status: 'Active' },
    { id: 3, name: 'Salon Service', price: 65, bookings: 18, status: 'Inactive' },
  ])

  const stats = [
    { icon: <FiBarChart2 />, label: 'Total Bookings', value: '54', change: '+12%' },
    { icon: <FiDollarSign />, label: 'Revenue', value: '$2,850', change: '+8%' },
    { icon: <FiUsers />, label: 'Customers', value: '42', change: '+5%' },
  ]
  const { logout } = useAuth()

const [passwordData, setPasswordData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const [passwordLoading, setPasswordLoading] = useState(false)
const [passwordError, setPasswordError] = useState('')
const [passwordSuccess, setPasswordSuccess] = useState('')

const handlePasswordChange = (e) => {
  setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  setPasswordError('')
  setPasswordSuccess('')
}

const handleChangePasswordSubmit = async (e) => {
  e.preventDefault()

  const { currentPassword, newPassword, confirmPassword } = passwordData

  if (!currentPassword || !newPassword || !confirmPassword) {
    return setPasswordError('All fields are required')
  }

  if (newPassword !== confirmPassword) {
    return setPasswordError('New passwords do not match')
  }

  if (newPassword.length < 6) {
    return setPasswordError('Password must be at least 6 characters')
  }

  try {
    setPasswordLoading(true)

    await vendorService.changePassword(currentPassword, newPassword)

    setPasswordSuccess('Password changed successfully. Please login again.')

    // Auto logout after 2 seconds
    setTimeout(() => {
      logout()
      window.location.href = '/login'
    }, 2000)

  } catch (err) {
    setPasswordError(err.message || 'Failed to change password')
  } finally {
    setPasswordLoading(false)
  }
}



  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Vendor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your services and track performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="text-3xl text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Services Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            My Services
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <FiPlus className="mr-2" />
            Add Service
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Service</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Price</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Bookings</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">
                    <div className="font-medium">{service.name}</div>
                  </td>
                  <td className="py-4 px-4">${service.price}</td>
                  <td className="py-4 px-4">{service.bookings}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(service.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password */}
<div className="card mt-10 max-w-xl">
  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
    Change Password
  </h2>

  {passwordError && (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
      {passwordError}
    </div>
  )}

  {passwordSuccess && (
    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
      {passwordSuccess}
    </div>
  )}

  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">
        Current Password
      </label>
      <input
        type="password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handlePasswordChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        New Password
      </label>
      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Confirm New Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>

    <Button
      type="submit"
      className="w-full"
      loading={passwordLoading}
    >
      Change Password
    </Button>
  </form>
</div>


      {/* Add Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Service"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Service Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg"
              placeholder="Enter service name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Enter service description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div className="pt-4">
            <Button className="w-full">Add Service</Button>
          </div>
        </div>
      </Modal>
    </div>
    
  )
}

export default VendorDashboard