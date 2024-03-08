import Note from '../models/notesSchema.js';

// Add a note to a lead
export const addNoteToLead = async (req, res) => {
  const { leadId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const newNote = new Note({
      leadId,
      content
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all notes for a lead
export const getNotesForLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    const notes = await Note.find({ leadId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(noteId, {
      content,
      updatedAt: Date.now()
    }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
