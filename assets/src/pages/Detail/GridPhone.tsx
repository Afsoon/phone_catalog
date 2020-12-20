import { MainContentLayout } from "../../components/Main"
import { GridInformation, GridTable } from "../../components/Grid"
import { PhoneModel } from "../../src/types"

export const GridPhoneLoading = () => {
  return (
    <MainContentLayout>
      <GridTable className="animate-pulse">
        <div className="bg-blue-400 rounded sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover" />
        <GridInformation className="sm:col-span-1" label="Screen">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="RAM">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Manufacturer">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Color">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Price">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
        <GridInformation className="sm:col-span-2" label="Description">
          <div className="bg-blue-400 h-4 w-3/4 rounded" />
        </GridInformation>
      </GridTable>
    </MainContentLayout>
  )
}

interface GridPhoneDataProps {
  data: PhoneModel
}

export const GridPhoneData: React.FC<GridPhoneDataProps> = ({ data }) => {
  return (
    <MainContentLayout>
      <GridTable>
        <img
          src={data.imageFileName}
          alt={data.name}
          className="sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:row-span-2 object-cover"
        />
        <GridInformation className="sm:col-span-1" label="Screen">
          <dd className="mt-1 text-sm text-gray-900">{data.screen}</dd>
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="RAM">
          <dd className="mt-1 text-sm text-gray-900">{data.ram}</dd>
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Manufacturer">
          <dd className="mt-1 text-sm text-gray-900">{data.manufacturer}</dd>
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Color">
          <dd className="mt-1 text-sm text-gray-900">{data.color}</dd>
        </GridInformation>
        <GridInformation className="sm:col-span-1" label="Price">
          <dd className="mt-1 text-sm text-gray-900">{data.price}</dd>
        </GridInformation>
        <GridInformation className="sm:col-span-2" label="Description">
          <dd className="mt-1 text-sm text-gray-900">{data.description}</dd>
        </GridInformation>
      </GridTable>
    </MainContentLayout>
  )
}
