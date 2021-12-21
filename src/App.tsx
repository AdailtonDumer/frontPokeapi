import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css"
import { MainPage } from './pages/MainPage';
import { NewPokemon } from "./pages/NewPokemon";
const headerImg = require('./assets/headerImg.png')


export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <Link to='/'>
            <img src={headerImg} alt="" />
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/new' element={<NewPokemon />} />
          <Route path='/new/:id' element={<NewPokemon />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}
