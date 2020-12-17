import * as React from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TextProps {
  className: string
  as: React.ElementType
}

const Text: React.FC<TextProps> = ({ className, children, as = "span" }) => {
  return React.createElement(as, { className }, children)
}

export default Text
