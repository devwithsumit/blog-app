import React, { ReactNode } from 'react'

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    type?: 'button' | 'submit'| 'reset',
    bgColor?: string,
    textColor?: string,
    className?: string,
}
function Button(
    {
        children,
        type = 'button',
        bgColor = 'bg-blue-600',
        textColor = 'text-white',
        className = " ",
        ...props
    }: Button
) {
    return (
        <button {...props} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}>
            {children}
        </button>
    )
}

export default Button