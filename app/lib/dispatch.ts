/**
 * dispatch: just a message bus that takes an action and passes that action to
 * the db and to the history. Undo/redo also calls dispatch, so then 
 *
 * history: should expose undo, redo in a way that doesn't make it necessary to
 * manually set the new history in the state
 */