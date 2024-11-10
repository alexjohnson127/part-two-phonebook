import '../index.css'
<index className="css"></index>
export default function Notification({message, isSuccess}){
    let typeOfMessage = isSuccess ? 'success' : 'error'
        
    if (message === null){
        return null
    }
    else{
        return(
            <div className={typeOfMessage}>
                {message}
            </div>
        )
    }
    
}