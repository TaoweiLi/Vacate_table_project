# **Vacate Table** | [LIVE](https://vacate-table.herokuapp.com/)

<img src="https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/Recording%202022-10-11%20at%2011.25.11.gif" width="750" height="400">

## **Description**
Vacate Table is a full-stack OpenTable clone where users can make reservations, write reviews and search, for dining spots across Bay Area.


## **Technologies**
- React
- Redux
- JavaScript
- Ruby on Rails
- AWS S3
- Google Map API
- PostgreSQL
- Webpack

## **Core Features**


### **User Authentication**
- User authentication is implemented on both frontend and backend. Presence validations and uniqueness contraints (for username and email) are enforced in models and database. Upon a successful signup, the password is hashed using BCrypt and saved to the database as a password digest.
- Users can sign up, sign in, and sign out of their accounts.
- Error messages are displayed next to the respective fields in the signup form as part of frontend error-handling.
![alt text](https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/sign-in.png)

### **Reservation CRUD**
- Making a reservation request user sign in. If the current user is not signed in, there would be a popover requesting them to sign in or use demo user mode instead. Signed-in users can choose party size, date and time when they making resevation.
- Confirmed reservations are viewable in the user profile, with options to update or cancel.
![alt text](https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/reservation-1.png)

```
  function handleReservSubmit(e) {
    e.preventDefault();
    const formattedDate = date.toISOString().split("T")[0];

    if (sessionUser) {
      let searchString = `?partySize=${partySize}&date=${formattedDate}&time=${time}`;

      if (isUpdateReservation && updateReservation) {
        searchString += `&updateReservationId=${updateReservation.id}`
      }

      history.push({
        pathname: `/restaurants/${restaurant.id}/reservation`,
        search: searchString,
      });
    } else {
      document.getElementById("signinModal").click();
    }
  }
```

### **Reviews CRUD**
- Writing a review request user sign in. If the current user is not signed in, there would be a popover requesting them to sign in or use demo user mode instead. Signed-in users can rate, write, update adn delete reviews of the restaurant.
- A restaurant review is viewable by the public but can only be updates and deleted by its reviewer.
![alt text](https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/review-1.png)

```
  function handleReviewSubmit(e) {
    e.preventDefault();
    if (sessionUser) {
      const newReview = { ...review, user_id: sessionUser.id }
      dispatch(createReview(newReview)).then(async (res) => {
        setReview(reviewData);
      }).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data.message]);
        else setErrors([res.statusText]);
        return
      });
    } else {
      document.getElementById("signinModal").click();
    }
  }
```

### **Restaurants**
- Different restaurant categories show on the home page(New to Vacate Table, Award Winning, Order takeout).
- Each restaurant page include restaurant information(Overview, Reviews) and a side reservation form.
![alt text](https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/restaurants-1.png)

```
def index
    tag = params[:tag]
    if (tag != nil)
      @restaurants = Restaurant.where("tag LIKE ?", "%#{tag}%")
    else
      @restaurants = Restaurant.all
    end

    @restaurant_ids = @restaurants.map { |res| res.id }
    @score_avg_by_id = Review.where(restaurant_id: @restaurant_ids).select(:restaurant_id, :rating).group(:restaurant_id).average(:rating)

    render :index
  end
```

### **Search Function**
- User can search restaurants' name and categories in the search bar field.
- Serch result page will show all the relative result.
![alt text](https://github.com/TaoweiLi/Vacate_table_project/raw/main/vtable_frontend/asset/search-1.png)

```
  function handleSubmit(e) {
    e.preventDefault();
    const searchBarState = {
      partySize,
      date,
      time
    }

    const searchString = `?query=${query}`;
    history.push({
      pathname: `/search`,
      search: searchString,
      state: searchBarState,
    });

    window.location.reload();
  }
```

### **Future Features**
- Users can make reviews on their past comfirmed reservations.
- Bookmark a Restaurant.
