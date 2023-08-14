const Nav = ({ authToken }) => {
  return (
    <nav>
      <div className="logo_container">
        <img className="logo" src="styles\images\logo.png" alt="" />
      </div>
      {!authToken && <button className="btn-nav">Log in</button>}
    </nav>
  );
};
export default Nav;
