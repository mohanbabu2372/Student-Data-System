import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import ViewStudent from './ViewStudent';
import './App.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link className="navbar-brand" to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJVBWb9f3KvcnAQiOhiA6YPAQY509ZzDxuQ&s" alt="Bootstrap" width="30" height="28" class="rounded me-1"/>
            Student Application</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/add">Add Student</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view">View Student</Link>
                </li>               
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/add" element={<AddStudent />} />
          <Route path="/student/updateStudent/:std_id" element={<UpdateStudent />} />
          <Route path="/view" element={<ViewStudent />} />
          <Route path="*" element={<ViewStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
