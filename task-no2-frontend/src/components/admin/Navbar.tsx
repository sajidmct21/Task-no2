function Navbar() {
  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <button
        className="bg-red-600 text-white px-5 py-2 rounded"
      >
        Logout
      </button>

    </header>
  );
}

export default Navbar;