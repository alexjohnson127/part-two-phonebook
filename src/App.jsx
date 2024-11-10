import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'
import './index.css'
import services from './services'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(1)

  useEffect(()=>{
    services.getAll().then(response => setPersons(response))
  },[])

  function checkForName(){
    let valid = 1
    persons.forEach(person => {
      if (person.name === newName){
        valid = 0
      }
    })
    return valid
  }

  function findId(){
    let foundId = null
    persons.forEach(person => {
      if (person.name === newName){
        foundId = person.id
      }
    })
    return foundId
  }

  function generateId(){
    let newId = persons.length + 1
    persons.forEach(person => {
      if (person.id >= newId){
        newId = Number(person.id) + 1
      }
    })
    return newId+""
  }

  const handleNameChange =(event) => {
    //handles input controlled form for name
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //handles input controlled form for number
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchCriteria(event.target.value)
  }

  const handleDeletion = (event) => {
    if(confirm(`Are you sure you want to delete ${event.target.id} from the phonebook?`)){
      console.log(`deleted ${event.target.id}`)
      services.remove(event.target.id)
      setPersons(persons.filter(person => person.id !== event.target.id))
    }
  }

  function handleSubmit(event){
    event.preventDefault()
    
    if (checkForName()){
      services.create({name : newName, number : newNumber, id : generateId()})
        .then(res => {
          setPersons(persons.concat(res))
        })
      //axios
      //  .post('http://localhost:3001/persons',{name : newName, number : newNumber, id : persons.length + 1} )
      //  .then(res => {
      //    console.log(res.data)
      //    setPersons(persons.concat(res.data))
      //  })
      let messageName=newName
      setIsSuccess(1)
      setMessage(`successfully added ${messageName}`)
      setTimeout(() => setMessage(null), 5000)
      setNewName('')
      setNewNumber('')

    }  
    else if(confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
      services.update(findId(),{name : newName, number : newNumber, id : findId()})
      .catch(error => {
        setIsSuccess(0)
        setMessage('already removed from server')
        setPersons(persons.filter(person => person.id !== findId()))
      })
      setPersons(persons.map(person => person.name === newName ? {name : newName, number : newNumber, id : findId()} : person))
      let messageName=newName
      setIsSuccess(1)
      setMessage(`successfully added ${messageName}`)
      setTimeout(() => setMessage(null), 5000)
      setNewName("")
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={isSuccess} />
      <Search searchCriteria={searchCriteria} handleSearchChange={handleSearchChange} />
      
      <Form handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <Persons persons={persons} searchCriteria={searchCriteria} handleDeletion={handleDeletion}/>
    </div>
  )
}

export default App
