import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Editorials from './pages/Editorials'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/editorials" element={<Editorials />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}
