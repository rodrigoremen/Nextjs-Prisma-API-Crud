import { Note } from '@prisma/client';
import { useNotes } from '@/context/noteContext';


function NoteCard({ note }: { note: Note }) {
    const { deleteNote, setSelectedNote } = useNotes();

    return (
        <div key={note.id} className='bg-green-500 p-4 my-2 flex justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>{note.title}</h1>
                <p>{note.content}</p>
            </div>
            <div className='flex gap-x-2'>
                <button className='px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700'
                    onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this note?')) {
                            await deleteNote(Number(note.id))
                        }
                    }}
                >Delete
                </button>
                <button className='px-5 py-2 text-white bg-yellow-600 rounded-md hover:bg-ywllow-700'
                    onClick={() => {
                        setSelectedNote(note)
                    }}
                    >Edit
                </button>
            </div>
        </div>
    )
}

export default NoteCard