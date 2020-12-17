const AppShell: React.FC = ({ children }) => {
  return (
    <div className="overflow-hidden w-screen h-screen bg-gray-100 grid grid-rows-7">
      {children}
    </div>
  )
}

export default AppShell
