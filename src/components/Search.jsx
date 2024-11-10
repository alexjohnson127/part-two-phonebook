export default function Search(props){
    return(
    <div>
        filter shown with: <input value={props.searchCriteria} onChange={props.handleSearchChange} />
    </div>)
}