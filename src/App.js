import './App.css';
import Cinema from "./Components/Cinema"
import Home from "./Pages/Home"
import Movies from './Components/Movies';
import Amsal from './Components/Amsal';
import Mosalsalat from './Components/Mosalsalat';
import AflamJokes from './Components/AflamJokes';
import Football from './Football Comps/Football';
import Questions from './Football Comps/Questions';
import Five from './Football Comps/Five';
import Count from './Football Comps/Count';
import Transfer from './Football Comps/Transfer';
import Password from './Football Comps/Password';
import Act from './Football Comps/Act';
import Tic from './Football Comps/Tic';
import Test from './Football Comps/Test';
import Who2 from './Football Comps/Who_iam2';
import Rondo from './Football Comps/Rondo';
import Risk from './Football Comps/RIsk';
import Who_Photo from './Football Comps/Who_Photo';
import LS from './Football Comps/Ladder_Snake';
import Casino from './Casinno/Casino';
import Hang from "./Random/HangMan"
import Ran from "./Random_infos/RandomCatsInfo"
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/Cinema" element={<Cinema></Cinema>}></Route>
          <Route path="/Movies" element={<Movies></Movies>}></Route>
          <Route path="/Amsal" element={<Amsal></Amsal>}></Route>
          <Route path="/Mosalsal" element={<Mosalsalat></Mosalsalat>}></Route>
          <Route path="/AfJokes" element={<AflamJokes></AflamJokes>}></Route>
          <Route path="/Football" element={<Football></Football>}></Route>
          <Route path="/Questions" element={<Questions></Questions>}></Route>
          <Route path="/Five" element={<Five></Five>}></Route>
          <Route path="/Count" element={<Count></Count>}></Route>
          <Route path="/Transfer" element={<Transfer></Transfer>}></Route>
          <Route path="/Password" element={<Password></Password>}></Route>
          <Route path="/Act" element={<Act></Act>}></Route>
          <Route path="/Tic" element={<Tic></Tic>}></Route>
          <Route path="/Test" element={<Test></Test>}></Route>
          <Route path="/Who2" element={<Who2></Who2>}></Route>
          <Route path="/Rondo" element={<Rondo></Rondo>}></Route>
          <Route path="/Risk" element={<Risk></Risk>}></Route>
          <Route path="/Who_Photo" element={<Who_Photo></Who_Photo>}></Route>
          <Route path="/LS" element={<LS></LS>}></Route>
          <Route path="/Casino" element={<Casino></Casino>}></Route>
          <Route path="/Ran" element={<Ran></Ran>}></Route>
          <Route path="/Hang" element={<Hang></Hang>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
