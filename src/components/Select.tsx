import React, { LegacyRef, useId } from 'react'
interface Select {
    options: any,
    label: string,
    className: string,
}
const Select = React.forwardRef(function Select(
    { options, label, className, ...props }: Select,
    ref: LegacyRef<HTMLSelectElement>
) {
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
                ${className}`}
            >
                {options?.map((option: any) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select