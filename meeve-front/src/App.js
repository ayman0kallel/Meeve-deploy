import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "../src/pages/HomePage"
import Profile from "../src/pages/Profile"
import CreerMeet from "./components/profile/CreerMeet";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MatchPage from "./pages/MatchPage";
import EditProfile from "./components/profile/EditProfile"
import ChooseSport from "./components/profile/ChooseSport"
import ChoosePlace from "./components/profile/ChoosePlace"
import  Rewards from "./components/profile/Rewards"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path="/HomePage" element={<HomePage/>}/>
          <Route path="/match" element={<MatchPage/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/CreerMeet" element={<CreerMeet/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/ChooseSport" element={<ChooseSport/>}/>
          <Route path="/ChoosePlace" element={<ChoosePlace/>}/>
          <Route path= "/Rewards" element= {<Rewards/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
