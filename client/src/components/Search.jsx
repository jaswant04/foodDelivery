import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Search = () => {
    return (
        <div className="relative flex-grow max-w-md">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 text-cgrey rounded-md focus:outline-none"
            />
            <button>
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-g~ray-900 hover:text-corg" />
            </button>
        </div>
    )
}

export default Search