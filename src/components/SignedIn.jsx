import Header from "./Header";
import NavBodyContainer from "./NavBodyContainer";
import Footer from "./Footer";

const SignedIn = ({ user, setUser }) => {
  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <NavBodyContainer />
      <Footer />
    </div>
  );
};

export default SignedIn;
