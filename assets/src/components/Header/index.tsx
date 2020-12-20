const Header: React.FC = ({ children }) => {
  return (
    <header className="row-span-3 flex bg-gray-800 pb-32 text-white px-4 justify-center">
      <div className="flex flex-col max-w-7xl w-full">{children}</div>
    </header>
  )
}

export default Header
