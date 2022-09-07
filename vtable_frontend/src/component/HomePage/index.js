import SearchHeader from "../SearchHeader";
import "./HomePage.scss";

function HomePage() {

  return (
    <>
      <header id="search-header">
        <SearchHeader />
      </header>
      <section id="main-content">
        <div id="main-section">
          <p>Main Section PlaceHolder</p>
          {/* <MainSection /> */}
        </div>
      </section>
    </>
  )

}

export default HomePage;