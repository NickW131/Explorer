import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Details from './pages/Details.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Manage from './pages/Manage.jsx';
import Submission from './pages/Submission.jsx';
import Confirmation from './pages/Confirmation.jsx';
import ReviewSubmission from './pages/ReviewSubmission.jsx';
import Submissions from './pages/Submissions.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/websites/:id" element={<Details />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manage/:id" element={<Manage />} />
                <Route path="/submit" element={<Submission />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/submissions/:id/review" element={<ReviewSubmission />} />
                <Route path="/submissions" element={<Submissions />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
