import Cards from "./components/Cards";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import DetailPage from "./components/DetailPage";



function App() {
  return (
    <>

    <div className="App relative">
    <Header />
    <Routes>
      <Route path="/" element={<Cards/>}/>
      <Route path="/addmovie" element={<AddMovie />}/>
      <Route path="/detail/:id" element={<DetailPage />}/>
    </Routes>
    </div>
    </>
  );
}

export default App;
