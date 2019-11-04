export const isNoteActive = (state: any, note: string) => {
  return state.activeNotes.has(note);
};
