import { Link } from 'react-router-dom'
import Button from '../../components/Common/Button.jsx'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/services">
            <Button variant="outline">Browse Services</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound