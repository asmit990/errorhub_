import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center glow-border">
            <span className="text-primary-foreground font-mono font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-foreground tracking-tight">
            Error<span className="text-primary">Hub</span>
          </span>
        </Link>

        <button onClick={handleLogout} className="btn-secondary text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
