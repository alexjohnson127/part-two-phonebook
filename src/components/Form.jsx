export default function Form({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}){
    return(
        <form onSubmit={handleSubmit}>
            <h1>Add a new</h1>
            <div>
              name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
              number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
              <button type="submit" >add</button>
            </div>
        </form>
    )
}