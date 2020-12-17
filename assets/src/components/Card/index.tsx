import * as React from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CardsProps {
  className: string
  as: React.ElementType
}

const Card: React.FC<CardsProps> = ({ className, children, as = "li" }) => {
  return React.createElement(as, { className }, children)
}

export default Card
