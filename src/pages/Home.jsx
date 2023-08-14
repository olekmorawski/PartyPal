import Nav from "../components/Nav";

const Home = () => {
  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className="overlay">
        <Nav authToken={authToken} />
        <div className="home">
          <h1>Have a Party</h1>
          <button className="btn-primary" onClick={handleClick}>
            {authToken ? "Singout" : "Create Account"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
