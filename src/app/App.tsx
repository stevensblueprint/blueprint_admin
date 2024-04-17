import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import BlogPage from '../pages/BlogPage'
import ApplicationsPage from '../pages/ApplicatiosPage'
import BudgetPage from '../pages/BudgetPage'
import TeamPage from '../pages/TeamPage'

function App (): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/team/:teamName" element={<TeamPage />} />
      </Routes>
    </div>
  )
}

export default App
