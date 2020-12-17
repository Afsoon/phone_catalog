export const Footer: React.FC = ({ children }) => {
  return (
    <footer className="row-span-1 row-start-7 bg-gray-800 flex justify-end py-4 px-4">
      {children}
    </footer>
  )
}

export const FooterActionOnMobile: React.FC = ({ children }) => {
  return <div className="md:hidden">{children}</div>
}
