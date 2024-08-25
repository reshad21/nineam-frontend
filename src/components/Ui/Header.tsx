const Header = () => {
  return (
    <div>
      <ul className="flex gap-2">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/signup">Signup</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
