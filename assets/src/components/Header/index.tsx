export const Header: React.FC = ({ children }) => {
  return (
    <header className="row-span-3 flex bg-gray-800 pb-32 text-white px-4 justify-center">
      <div className="flex flex-col max-w-7xl w-full">{children}</div>
    </header>
  )
}

export const SubHeader: React.FC = ({ children }) => {
  return (
    <div className="hidden md:pb-2 md:inline-block md:self-end md:px-2 2xl:px-8 sm:px-6 lg:px-4">
      {children}
    </div>
  )
}
