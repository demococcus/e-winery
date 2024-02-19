function TaskNote({children}) {

  return children !== null ? <div style={{ fontStyle: 'italic' }} className="mt-2">Note: {children}</div> : null;

} 

export default TaskNote;