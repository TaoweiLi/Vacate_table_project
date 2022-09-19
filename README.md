# **Vacate Table** 

<img src="https://github.com/TaoweiLi/Cat_Game/raw/main/asset/gameplay.gif" width="500" height="300">
## **Description**
Vacate Table is a full-stack OpenTable clone where users can make reservations, write reviews and search, for dining spots across Bay Area.

[Website](https://vacate-table.herokuapp.com/)

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
- User authentication is implemented on both frontend and backend.
- Users can sign up, sign in, and sign out of their accounts.
- Error messages are displayed next to the respective fields in the signup form as part of frontend error-handling.

### **Reservation CRUD**
- Making a reservation request user sign in. If the current user is not signed in, there would be a popover requesting them to sign in or use demo user mode instead. Signed-in users can choose party size, date and time when they making resevation.
- Confirmed reservations are viewable in the user profile, with options to update or cancel.

### **Reviews CRUD**
- Writing a review request user sign in. If the current user is not signed in, there would be a popover requesting them to sign in or use demo user mode instead. Signed-in users can rate, write, update adn delete reviews of the restaurant.
- A restaurant review is viewable by the public but can only be updates and deleted by its reviewer.

### **Search Function**
- User can search restaurants' name and categories in the search bar field.

### **Future Features**
- Users can make reviews on their past comfirmed reservations.
- Bookmark a Restaurant.
