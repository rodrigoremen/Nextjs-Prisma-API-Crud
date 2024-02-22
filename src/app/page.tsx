"use client";

import NoteForm from '@/components/NoteForm';
import NoteCard from '@/components/NoteCard';
import { useEffect } from 'react';
import { useNotes } from '@/context/noteContext';


function HomePage() {
	const { notes, loadNotes } = useNotes();

	useEffect(() => {
		loadNotes();
	}
		, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<div>
				<NoteForm />
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</div>
	);
}

export default HomePage;
