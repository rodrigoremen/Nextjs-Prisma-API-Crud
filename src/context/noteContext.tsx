"use client"

import { createContext, useState, useContext } from 'react';
import { CreateNote, UpdateNote } from '@/interfaces/Note';
import { Note } from '@prisma/client';

export const NoteContext = createContext<
	{
		notes: Note[];
		loadNotes: () => Promise<void>;
		createNotes: (note: CreateNote) => Promise<void>;
		deleteNote: (id: number) => Promise<void>;
		selectedNote: Note | null;
		setSelectedNote: (note: Note | null) => void;
		updateNotes: (id: number, note: UpdateNote) => Promise<void>;
	}
>({
	notes: [],
	loadNotes: async () => { },
	createNotes: async (note: CreateNote) => { },
	deleteNote: async (id: number) => { },
	selectedNote: null,
	setSelectedNote: (note: Note | null) => { },
	updateNotes: async (id: number, note: UpdateNote) => { }
});

export const useNotes = () => {
	const context = useContext(NoteContext)
	if (!context) {
		throw new Error('useNotes must be used within a NotesProvider')
	}
	return context;
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {

	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);

	async function loadNotes() {
		const resp = await fetch('/api/notes');
		const data = await resp.json();
		return setNotes(data);
	}

	async function createNotes(note: CreateNote) {
		const res = await fetch('/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
		const newNote = await res.json()
		setNotes([...notes, newNote])
	}

	async function deleteNote(id: number) {
		const res = await fetch(`http://localhost:3000/api/notes/` + id, {
			method: 'DELETE'
		})
		const data = await res.json()
		setNotes(notes.filter(note => note.id !== id))
	}

	async function updateNotes(id:number,note: UpdateNote) {
		const res = await fetch(`http://localhost:3000/api/notes/` + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
		const data = await res.json()
		setNotes(notes.map(note => note.id === id ? { ...note, ...data } : note))
	}

	return (
		<NoteContext.Provider value={{ 
			notes, 
			loadNotes, 
			createNotes, 
			deleteNote, 
			selectedNote, 
			setSelectedNote,
			updateNotes
			 }}>
			{children}
		</NoteContext.Provider>
	);

};
