export default function Persons({persons, searchCriteria, handleDeletion}){
    console.log(persons)
    return(
        <>
            {//persons array is filtered based on search criteria then mapped
            persons.filter(person => person.name.toLowerCase().includes(searchCriteria.toLowerCase()))
            .map(person => 
                <div key={person.name}>
                    <div>{person.name} {person.number}<button onClick={handleDeletion} id={person.id}>Delete</button></div>  
                </div>           
            )}
        </>
    )
}