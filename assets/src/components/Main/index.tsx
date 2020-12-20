import * as React from "react"
import Error from "../../Error/Error.svg"

const MainLayout: React.FC = ({ children }) => {
  return (
    <main className="row-span-3 row-start-4 -mt-32 overflow-hidden h-full">
      <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
        <div className="overflow-auto h-full bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          {children}
        </div>
      </div>
    </main>
  )
}

export const MainHeaderLayout: React.FC = ({ children }) => {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      {children}
    </div>
  )
}

export const MainHeaderActionsLayout: React.FC = ({ children }) => {
  return <div className="mt-3 flex sm:mt-0 sm:ml-4">{children}</div>
}

interface MainContentProps {
  className?: string
  as?: React.ElementType
  withoutBorder?: boolean
}

export const MainContentLayout: React.FC<MainContentProps> = ({
  children,
  className,
  as = "div",
  withoutBorder = false,
}) => {
  return React.createElement(
    as,
    {
      className: `border-gray-200 px-4 py-5 sm:px-6 ${className} ${
        withoutBorder ? "border-t-0" : "border-t"
      }`,
    },
    children,
  )
}

export const MainErrorMessage: React.FC = ({ children }) => {
  return (
    <MainContentLayout className="flex flex-col px-5 py-6 sm:px-6">
      <img
        src={Error}
        className="h-1/2 w-1/2 self-center"
        alt="Unable to load the phones"
      />
      {children}
    </MainContentLayout>
  )
}

export default MainLayout
