import "./SearchHeader.scss"

function SearchHeader() {


  return (
    <>
      <div className="search-header">
        <h1 className="header-sent">Find your table for any occasion</h1>
        <div className="seacrch-bar">
          <div className="dtp">
            <div className="dtp-date">
              <input type="date" />
            </div>
            <div className="dtp-time">
              <input type="time" />
            </div>
            <div className="dtp-people">
              <input type="number" />
            </div>
          </div>
          <div className="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchHeader;