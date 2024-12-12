import React, { LegacyRef, useId } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string,
    type?: string,
    className?: string,
    image? : any,
}

const Input = React.forwardRef(function Input(
    { label, type, className = "", ...props }: InputProps,
    ref: LegacyRef<HTMLInputElement>
) {
    const id = useId();

    return (
        <div className='w-full'>
            {/* label to identify input fields */}
            {label &&
                <label
                    htmlFor={id}
                    className='inline-block mb-1 pl-1'>
                    {label}
                </label>
            }
            {/* main input field with type, ref, id etc.}*/}
            <input
                type={type}
                className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})
export default Input