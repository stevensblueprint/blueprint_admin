import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import BlogPage from '../pages/BlogPage'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </div>
  )
}

export default App
