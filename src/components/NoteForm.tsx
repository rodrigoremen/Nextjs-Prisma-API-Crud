"use client"

import { useState, useRef } from 'react'
import { useNotes } from '@/context/noteContext'

function NodeForm() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleRef = useRef<HTMLInputElement>(null)

    const { createNotes, selectedNote } = useNotes();


    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            await createNotes({ title, content });
            setTitle('')
            setContent('')
            titleRef.current?.focus()

        }}>
            <input
                type="text"
                name='title'
                autoFocus
                placeholder='Title'
                className='w-full px-4 py-2 text-black bg-white rounded-md focus: outline-none focus:ring-2 focus: ring-blue-600 my-2'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                ref={titleRef}
            />
            <textarea
                name='content'
                placeholder='Content'
                className='w-full px-4 py-2 text-black bg-white rounded-md focus: outline-none focus:ring-2 focus: ring-blue-600 my-2'
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <button
                type="submit"
                className='px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'

            >Submit
            </button>
        </form>
    )
}

export default NodeForm