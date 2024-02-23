import { Note } from '@prisma/client';
import { useNotes } from '@/context/noteContext';
import { HiTrash, HiPencil } from "react-icons/hi";


function NoteCard({ note }: { note: Note }) {
    const { deleteNote, setSelectedNote } = useNotes();

    return (
        <div key={note.id} className='bg-green-500 p-4 my-2 flex justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>{note.title}</h1>
                <p>{note.content}</p>
                <p>
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className='flex gap-x-2'>
                <button className='px-5 py-2 text-white bg-red-400 rounded-md hover:bg-red-700'
                    onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this note?')) {
                            await deleteNote(Number(note.id))
                        }
                    }}
                >
                    <HiTrash className='text-2xl text-red-600' />
                </button>
                <button className='px-5 py-2 text-white bg-yellow-400 rounded-md hover:bg-yellow-700'
                    onClick={() => {
                        setSelectedNote(note)
                    }}
                    >
                    <HiPencil className='text-2xl text-yellow-600' />
                </button>
               
            </div>
        </div>
    )
}

export default NoteCard