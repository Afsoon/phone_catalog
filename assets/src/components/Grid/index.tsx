interface GridTableProps {
  className?: string
}

export const GridTable: React.FC<GridTableProps> = ({
  children,
  className,
}) => {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 2xl:grid-rows-2 ${className}`}
    >
      {children}
    </dl>
  )
}

interface GridInformationProps {
  label: string
  className?: string
}

export const GridInformation: React.FC<GridInformationProps> = ({
  label,
  children,
  className,
}) => {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      {children}
    </div>
  )
}
