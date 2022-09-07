import "./RestaurantsCategory.scss"
import RestaurantCard from "../RestaurantCard";



function RestaurantsCategory({ title }) {

  return (
    <>
      <div className="res-category">
        <section className="blank-area">
          <header className="category-header">
            <h2 className="category-header-text">{title}</h2>
          </header>
          <div className="res-cards">
            <RestaurantCard />
          </div>
        </section>

      </div>
    </>
  )
}

export default RestaurantsCategory;