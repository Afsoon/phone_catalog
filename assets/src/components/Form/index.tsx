import * as React from "react"
import { msgErrorsPhoneForm } from "../../src/validateForms"

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  as?: React.ElementType
  errors?: Record<string, any>
  register: ({ required }: { required?: boolean }) => RefReturn
} & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const FileField: React.FC<InputProps> = ({
  name = "",
  label,
  children = null,
  register,
  required,
  errors = {},
  ...props
}) => {
  if (!name) {
    console.error("Provide a name for the input")
  }
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-2 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={name}
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  {...props}
                  accept="image/*"
                  name={name}
                  id={name}
                  type="file"
                  className="sr-only"
                  ref={register({ required })}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            {errors[name] && (
              <span className="mt-2 text-sm text-red-600">
                {msgErrorsPhoneForm[name]}
              </span>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const Field: React.FC<InputProps> = ({
  name = "",
  label,
  children = null,
  register,
  required,
  errors = {},
  as = "input",
  ...props
}) => {
  if (!name) {
    console.error("Provide a name for the input")
  }
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex flex-col rounded-md shadow-sm">
          {React.createElement(as, {
            ...props,
            ref: register({ required }),
            id: name,
            name,
          })}
          {errors[name] && (
            <span className="hidden mt-2 text-sm text-red-600 sm:block">
              {msgErrorsPhoneForm[name]}
            </span>
          )}
        </div>
      </div>
      {errors[name] && (
        <span className="mt-2 text-sm text-red-600 sm:hidden">
          {msgErrorsPhoneForm[name]}
        </span>
      )}
      {children}
    </div>
  )
}

export { Field, FileField }
