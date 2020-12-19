// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PhoneCardProps {
  src: string
  alt: string
  price: number
  productName: string
  manufacturer: string
}

const PhoneCardInformation: React.FC<PhoneCardProps> = ({
  src,
  alt,
  price,
  productName,
  manufacturer,
}) => {
  return (
    <>
      <img src={src} alt={alt} />
      <div className="px-4 pb-2 space-y-1">
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Nombre:</span>
          {productName}
        </div>
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Precio:</span>
          {price} €
        </div>
        <div className="text-md ">
          <span className="pr-1 text-sm text-gray-600">Manufacturador:</span>
          {manufacturer}
        </div>
      </div>
    </>
  )
}

export const LoadingCardSkeleton: React.FC = () => {
  return (
    <>
      <div className="w-full h-24 bg-blue-400 rounded-none rounded-t-md" />
      <div className="px-4 pb-2 pt-2 space-y-1">
        <div className="bg-blue-400 h-4 w-3/4 rounded "></div>
        <div className="bg-blue-400 h-4 w-3/4 rounded "></div>
        <div className="bg-blue-400 h-4 w-3/4 rounded "></div>
      </div>
    </>
  )
}

export const LoadingCard: React.FC = ({ children }) => {
  return (
    <li className="border border-blue-300 shadow rounded-md w-full mx-auto">
      <div className="animate-pulse">{children}</div>
    </li>
  )
}

export default PhoneCardInformation
