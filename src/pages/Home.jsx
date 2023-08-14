import Nav from "../components/Nav";

const Home = () => {
  const authToken = true;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <Nav />
      <div className="home">
        <h1>Have a Party</h1>
        <button className="btn-primary" onClick={handleClick}>
          {authToken ? "Singout" : "Create Account"}
        </button>
      </div>
    </>
  );
};
export default Home;
