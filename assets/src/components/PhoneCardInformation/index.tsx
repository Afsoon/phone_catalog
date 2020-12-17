import * as React from "react"
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default PhoneCardInformation
