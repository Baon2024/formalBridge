//searchTerm - import teh design from material Design??
//start with standard
import styles from './searchTerm.module.css'

function SearchBar({searchTerm, setSearchTerm}) {

   function handleSearchTerm(e) {
    const termToSearch = e.target.value;
    setSearchTerm(termToSearch);
    console.log("The current search term is: ", searchTerm);
   }

   


    return (
        <>
          <div className={styles.searchBar}>
            <input className={styles.searchBarInput} value={searchTerm} onChange={handleSearchTerm} placeholder="Search by College or Event" />
          </div>
        </>
    )
}

export default SearchBar;