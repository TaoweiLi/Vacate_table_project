# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

# ApplicationRecord.transaction do
puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
# Review.destroy_all
# Reservation.destroy_all
# Restaurant.destroy_all
# User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!("users")
ApplicationRecord.connection.reset_pk_sequence!("restaurants")
ApplicationRecord.connection.reset_pk_sequence!("reservations")
ApplicationRecord.connection.reset_pk_sequence!("reviews")

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
u1 = User.create!(
  first_name: "Daisy",
  last_name: "Li",
  email: "dali@vtable.com",
  phone_number: "1234567890",
  password: "123456",
)

# More users
u = []
11.times do
  user = User.create!({
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
    email: Faker::Internet.unique.email,
    phone_number: Faker::Number.number(digits: 10),
    password: "123456",
  })
  u << user
end

puts "Creating restaurnts..."
# order takeout
r1 = Restaurant.create!(
  name: "Blind Tasting",
  address: "749 Laurel St, Carlos, CA 94070",
  description: "Blind Tasting is the creation of two brotherlike cousins with a shared vision of a great wine, beer and food. Our Redwood burl slabs created rustic, cozy, dimly-lit den offers unpretentious atmosphere, perfect for an intimate gathering or a spontaneous after-work drink.",
  cuisine: "Wine Bar",
  expense: "$30 and under",
  neighborhood: "San Carlos",
  operation_hours: "Fri 3:00 pm–9:30 pm Sat 11:00 am–9:30 pm Dinner Mon–Thu 3:00 pm–9:00 pm Sun 11:00 am–9:00 pm Happy Hour Mon–Fri 3:00 pm–6:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "Public Lot",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.blindtastingsc.com/",
  phone_number: "(650) 264-8221",
  tag: "order_takeout",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/25898035.jpg",
  lat: 37.5040743, 
  lng: -122.2607473,
)

file1 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/25898035.jpeg")
r1.photo.attach(io: file1, filename: "25898035.jpeg")
# p1 = URI.open()

r1_reser1 = Reservation.create!(
  date: "10-06-2022",
  time: "17:00",
  party_size: 3,
  restaurant_id: r1.id,
  user_id: u[1].id,
)

r1_reser2 = Reservation.create!(
  date: "15-06-2022",
  time: "20:00",
  party_size: 7,
  restaurant_id: r1.id,
  user_id: u[2].id,
)

r1_rev1 = Review.create!(
  rating: 5,
  body: "This was a good location for a first date! Nice ambience",
  user_id: u[1].id,
  restaurant_id: r1.id,
)

r1_rev2 = Review.create!(
  rating: 4,
  body: "Our server was great and very accommodating. Food was yummy.",
  user_id: u[2].id,
  restaurant_id: r1.id,
)

r2 = Restaurant.create!(
  name: "Porterhouse",
  address: "60 E. Third Ave, San Mateo, CA 94401",
  description: "The renowned art of dry aging finally arrives in San Mateo, as our new dry aging window is now completed. We are proud to be the only restaurant on the Peninsula (In between San Francisco & San Jose) to have an in-house dry aging facility.",
  cuisine: "Steakhouse",
  expense: "$31 to $50",
  neighborhood: "San Mateo",
  operation_hours: "Sun 5:00 pm–9:00 pm Dinner Mon–Sat 5:00 pm–10:00 pm",
  dining_style: "Fine Dining",
  dress_code: "Casual Dress",
  parking_details: "San Mateo offers a 3-level Parking Garage, located behind our restaurant, that stretches 3 blocks. (From San Mateo Drive to B Street). The name of the garage is the Central Parking Garage and parking is free after 6 pm.",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.porterhousesanmateo.com/",
  phone_number: "(650) 579-5911",
  tag: "order_takeout",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/27694738.jpg",
  lat: 37.5634731,
  lng: -122.3265981,
)

file2 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/27694738.jpeg")
r2.photo.attach(io: file2, filename: "27694738.jpeg")

r2_reser1 = Reservation.create!(
  date: "08-05-2022",
  time: "17:30",
  party_size: 4,
  restaurant_id: r2.id,
  user_id: u[3].id,
)

r2_reser2 = Reservation.create!(
  date: "23-05-2021",
  time: "18:30",
  party_size: 5,
  restaurant_id: r2.id,
  user_id: u[4].id,
)

r2_rev1 = Review.create!(
  rating: 4,
  body: "Food was great, service outstanding, environment wonderful. Had a great company dinner there, will recommend again.",
  user_id: u[3].id,
  restaurant_id: r2.id,
)

r2_rev2 = Review.create!(
  rating: 5,
  body: "Food was Fantastic! Waitress had wonderful suggestions that turned out superb. We will go back!",
  user_id: u[4].id,
  restaurant_id: r2.id,
)

r3 = Restaurant.create!(
  name: "Osteria",
  address: "247 Hamilton Ave, Palo Alto, CA 94301",
  description: "Our vision is to insure a quality dining every time you eat with us. Osteria's purpose is to provide 'Culinary Contentment.",
  cuisine: "Italian",
  expense: "$30 and under",
  neighborhood: "Palo Alto",
  operation_hours: "Daily 5:00 pm–9:00 pm",
  dining_style: "Casual Elegant",
  dress_code: "Casual Dress",
  parking_details: "Street Parking",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "https://www.osteriatoscanapaloalto.com/",
  phone_number: "(650) 328-5700",
  tag: "order_takeout",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/25544914.jpg",
  lat: 37.563494,
  lng: -122.3331642,
)

file3 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/25544914.jpeg")
r3.photo.attach(io: file3, filename: "25544914.jpeg")

r3_reser1 = Reservation.create!(
  date: "15-04-2022",
  time: "12:30",
  party_size: 3,
  restaurant_id: r3.id,
  user_id: u[5].id,
)

r3_reser2 = Reservation.create!(
  date: "08-06-2022",
  time: "18:00",
  party_size: 2,
  restaurant_id: r3.id,
  user_id: u[6].id,
)

r3_rev1 = Review.create!(
  rating: 5,
  body: "Outdoor setting is very comfortable. Food was delicious and service is great.",
  user_id: u[5].id,
  restaurant_id: r3.id,
)

r3_rev2 = Review.create!(
  rating: 4,
  body: "Great place for a romantic.",
  user_id: u[6].id,
  restaurant_id: r3.id,
)

r4 = Restaurant.create!(
  name: "Amoura Restaurant",
  address: "713 Linden Avenue, South San Francisco, CA 94080",
  description: "Amoura Restaurant, located in the heart of South San Francisco, brings modern Mediterranean fare to the Bay Area when its doors open early 2015.",
  cuisine: "Mediterranean",
  expense: "$30 and under",
  neighborhood: "South San Francisco",
  operation_hours: "Daily 5:00 pm–9:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "We offer private parking at Amoura. There is also street parking available for your convenience.",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.amourasf.com/",
  phone_number: "(650) 754-6891",
  tag: "order_takeout",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/30720229.jpg",
  lat: 37.6595642,
  lng: -122.4111357,
)

file4 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/30720229.jpeg")
r4.photo.attach(io: file4, filename: "30720229.jpeg")

r4_reser1 = Reservation.create!(
  date: "23-06-2022",
  time: "19:00",
  party_size: 2,
  restaurant_id: r4.id,
  user_id: u[7].id,
)

r4_reser2 = Reservation.create!(
  date: "15-07-2022",
  time: "17:30",
  party_size: 4,
  restaurant_id: r4.id,
  user_id: u[8].id,
)

r4_rev1 = Review.create!(
  rating: 5,
  body: "Super friendly and efficient service. Food was delicious - as always.",
  user_id: u[7].id,
  restaurant_id: r4.id,
)

r4_rev2 = Review.create!(
  rating: 4,
  body: "Amoura is a great family restaurant. Very spacious and had delicious food. I will definitely go again.",
  user_id: u[8].id,
  restaurant_id: r4.id,
)


r5 = Restaurant.create!(
  name: "54 Mint",
  address: "16 Mint Plaza, San Francisco, CA 94103",
  description: "54 Mint is a little gem in the heart of downtown San Francisco across from the old US Mint Building. We offer authentic Roman cuisine prepared only with fresh and seasonal ingredients. Our pastas, bread and desserts are made fresh on a daily basis.",
  cuisine: "Italian",
  expense: "$31 to $50",
  neighborhood: "SOMA",
  operation_hours: "Brunch Sat, Sun 10:30 am–3:00 pm Lunch Mon–Fri 11:30 am–3:00 pm Dinner Daily 5:00 pm–10:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Smart Casual",
  parking_details: "a Public Parking Garage is also available, located on the corner of Mission and 5th streets.",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "https://www.54mint.com/",
  phone_number: "(415) 543-5100",
  tag: "order_takeout",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/49014781.jpg",
  lat: 37.7825998,
  lng: -122.4101293,
)

file5 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/49014781.jpeg")
r5.photo.attach(io: file5, filename: "49014781.jpeg")

r5_reser1 = Reservation.create!(
  date: "03-06-2022",
  time: "12:00",
  party_size: 2,
  restaurant_id: r5.id,
  user_id: u[9].id,
)

r5_reser2 = Reservation.create!(
  date: "12-07-2022",
  time: "17:30",
  party_size: 4,
  restaurant_id: r5.id,
  user_id: u[10].id,
)

r5_rev1 = Review.create!(
  rating: 5,
  body: "Super friendly and efficient service. Food was delicious - as always.",
  user_id: u[9].id,
  restaurant_id: r5.id,
)

r5_rev2 = Review.create!(
  rating: 4,
  body: "Amoura is a great family restaurant. Very spacious and had delicious food. I will definitely go again.",
  user_id: u[10].id,
  restaurant_id: r5.id,
)

# New to vTable
r6 = Restaurant.create!(
  name: "Mona Lisa Mare e Monti",
  address: "414 Columbus Ave, San Francisco, CA 94133-3929",
  description: "Mona Lisa Mare e Monti , in San Francisco, serves classic Italian dishes crafted with top-quality local and seasonal produce in its charming and welcoming eatery. Mare e Monti is located in the Heart of North Beach's Little Italy.",
  cuisine: "Italian",
  expense: "$30 and under",
  neighborhood: "North Beach",
  operation_hours: "Mon–Fri 4:00 pm–10:00 pm Sat, Sun 11:00 am–11:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "Street Parking",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.monalisamaremonti.com/",
  phone_number: "(415) 398-1300",
  tag: "new_to_vtable",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/49228648.jpg",
  lat: 37.7990237,
  lng: -122.4102013,
)

file6 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/49228648.jpeg")
r6.photo.attach(io: file6, filename: "49228648.jpeg")

r6_reser1 = Reservation.create!(
  date: "07-08-2022",
  time: "13:00",
  party_size: 4,
  restaurant_id: r6.id,
  user_id: u[0].id,
)

r6_reser2 = Reservation.create!(
  date: "27-08-2022",
  time: "16:30",
  party_size: 6,
  restaurant_id: r6.id,
  user_id: u[1].id,
)

r6_rev1 = Review.create!(
  rating: 4,
  body: "Very nice food and great experience. The room temperature was a little too cold.",
  user_id: u[0].id,
  restaurant_id: r6.id,
)

r6_rev2 = Review.create!(
  rating: 4,
  body: "I've been back several times and the menu and service is consistently good.",
  user_id: u[1].id,
  restaurant_id: r6.id,
)

r7 = Restaurant.create!(
  name: "Heritage Restaurant Bar",
  address: "708 Clement St., San Francisco, CA 94118",
  description: "In the heart of the Richmond District, Heritage Restaurant & Bar has a warm atmosphere where families, friends, or co-workers come for a great meal and/or drink to unwind.",
  cuisine: "American",
  expense: "$30 and under",
  neighborhood: "Richmond District",
  operation_hours: "Wed, Thu, Sun 3:00 pm–9:00 pm Fri, Sat 3:00 pm–10:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "residential and metered parking, there is a city parking lot with meters at 324 8th avenue lot. Shh don't tell everyone but the bus stop in front of the restaurant allows for parking after 8pm",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.heritagerestaurantbar.com/",
  phone_number: "(415) 386-2200",
  tag: "new_to_vtable",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/25544252.jpg",
  lat: 37.7830494,
  lng: -122.4690588,
)

file7 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/25544252.jpeg")
r7.photo.attach(io: file7, filename: "25544252.jpeg")

r7_reser1 = Reservation.create!(
  date: "16-08-2022",
  time: "16:00",
  party_size: 2,
  restaurant_id: r7.id,
  user_id: u[2].id,
)

r7_reser2 = Reservation.create!(
  date: "03-08-2022",
  time: "17:30",
  party_size: 2,
  restaurant_id: r7.id,
  user_id: u[3].id,
)

r7_rev1 = Review.create!(
  rating: 5,
  body: "Great place!! Been there over 10 times and loving everything about it...",
  user_id: u[2].id,
  restaurant_id: r7.id,
)

r7_rev2 = Review.create!(
  rating: 5,
  body: "Great and warm staff - wonderful food and cocktails. Heritage is such a great restaurant.",
  user_id: u[3].id,
  restaurant_id: r7.id,
)

r8 = Restaurant.create!(
  name: "Wilder SF",
  address: "3145 Fillmore St, San Francisco, CA 94123-3451",
  description: "Wilder, founded in 2020, is inspired by our time spent traveling and exploring the outdoors. We've created a sophisticated menu of casual international comfort food that's best shared. Featuring an approachable menu of seafood skillet plates, hearty salads, and delicious meat and vegetable dishes.",
  cuisine: "Comfort Food",
  expense: "$30 and under",
  neighborhood: "Marin",
  operation_hours: "Brunch Sat, Sun 10:00 am–3:00 pm Happy Hour Fri 4:00 pm–6:30 pm Sat, Sun 3:00 pm–6:00 pm Dinner Mon 5:00 pm–10:00 pm Wed, Thu 5:00 pm–11:00 pm Fri, Sat 4:00 pm–10:00 pm Sun 4:00 pm–8:00 pm Bar Fri, Sat 10:00 pm–1:00 am",
  dining_style: "Casual Dining",
  dress_code: "Business Casual",
  parking_details: "Street Parking",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://wildersf.com/",
  phone_number: "(415) 741-6605",
  tag: "new_to_vtable",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/49156999.jpg",
  lat: 37.7988207,
  lng: -122.4379194,
)

file8 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/49156999.jpeg")
r8.photo.attach(io: file8, filename: "49156999.jpeg")

r8_reser1 = Reservation.create!(
  date: "25-08-2022",
  time: "19:00",
  party_size: 2,
  restaurant_id: r8.id,
  user_id: u[4].id,
)

r8_reser2 = Reservation.create!(
  date: "02-09-2022",
  time: "18:00",
  party_size: 2,
  restaurant_id: r8.id,
  user_id: u[5].id,
)

r8_rev1 = Review.create!(
  rating: 3,
  body: "Both my husband and I agreed Food amazing Service needs some work",
  user_id: u[4].id,
  restaurant_id: r8.id,
)

r8_rev2 = Review.create!(
  rating: 5,
  body: "Awesome local gem. Family friendly.",
  user_id: u[5].id,
  restaurant_id: r8.id,
)

r9 = Restaurant.create!(
  name: "Bogie's Too",
  address: "1335 4th St, San Rafael, CA 94901-2809",
  description: "At Bogie’s Too, we have proudly expanded into our prime downtown San Rafael location. Through our dedication to service, care for our customers, and the dedicated community that has backed us every step of the way, we have managed to not only bounce back, but to take our business farther than we could have ever imagined.",
  cuisine: "American",
  expense: "$30 and under",
  neighborhood: "San Rafael",
  operation_hours: "Lunch Wed–Sun 9:00 am–2:00 pm Dinner Wed–Sat 4:00 pm–8:30 pm Sun 4:00 pm–8:00",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "Public Lot",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "https://bogiestoo.com/",
  phone_number: "(415) 492-1530",
  tag: "new_to_vtable",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/2/49035573.png",
  lat: 37.9733357,
  lng: -122.5338859,
)

file9 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/49035573.png")
r9.photo.attach(io: file9, filename: "49035573.jpeg")

r9_reser1 = Reservation.create!(
  date: "13-08-2022",
  time: "19:30",
  party_size: 2,
  restaurant_id: r9.id,
  user_id: u[6].id,
)

r9_reser2 = Reservation.create!(
  date: "28-08-2022",
  time: "18:30",
  party_size: 2,
  restaurant_id: r9.id,
  user_id: u[7].id,
)

r9_rev1 = Review.create!(
  rating: 3,
  body: "Both my husband and I agreed Food amazing Service needs some work",
  user_id: u[6].id,
  restaurant_id: r9.id,
)

r9_rev2 = Review.create!(
  rating: 5,
  body: "Awesome local gem. Family friendly.",
  user_id: u[7].id,
  restaurant_id: r9.id,
)

r10 = Restaurant.create!(
  name: "STK - San Francisco",
  address: "1 Market St, San Francisco, CA 94105-1420",
  description: "At Bogie’s Too, we have proudly expanded into our prime downtown San Rafael location. Through our dedication to service, care for our customers, and the dedicated community that has backed us every step of the way, we have managed to not only bounce back, but to take our business farther than we could have ever imagined.",
  cuisine: "Steakhouse",
  expense: "$50 and over",
  neighborhood: "Financial District",
  operation_hours: "Lunch Daily 11:00 am–3:00 pm Dinner Mon–Thu 3:30 pm–11:00 pm Fri, Sat 3:00 pm–1:00 am Sun 3:00 pm–10:00 pm",
  dining_style: "Fine Dining",
  dress_code: "Business Casual",
  parking_details: "Public Lot",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://stksteakhouse.com/",
  phone_number: "(415) 492-1530",
  tag: "new_to_vtable",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/48569639.jpg",
  lat: 37.7567476,
  lng: -122.4321993,
)

file10 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/48569639.jpeg")
r10.photo.attach(io: file10, filename: "48569639.jpeg")

r10_reser1 = Reservation.create!(
  date: "15-08-2022",
  time: "18:30",
  party_size: 8,
  restaurant_id: r9.id,
  user_id: u[8].id,
)

r10_reser2 = Reservation.create!(
  date: "24-08-2022",
  time: "18:30",
  party_size: 2,
  restaurant_id: r10.id,
  user_id: u[9].id,
)

r10_rev1 = Review.create!(
  rating: 3,
  body: "Music was way too loud and we practically had to yell to each other at our table.",
  user_id: u[8].id,
  restaurant_id: r10.id,
)

r10_rev2 = Review.create!(
  rating: 5,
  body: "Fantastic service from Kevin and Fatima ! Will be back!",
  user_id: u[9].id,
  restaurant_id: r10.id,
)

# Award Winning
r11 = Restaurant.create!(
  name: "Berber",
  address: "1516 Broadway, San Francisco, CA 94109-2516",
  description: "Escape to a hidden oasis in the heart of San Francisco. Recognized in Michelin Guide's Bib Gourmand 2021, our modern Moroccan menu offers an aromatic dining experience to fully immerse the senses and simulate a night out in the exotic Mediterranean.",
  cuisine: "Moroccan",
  expense: "$30 and under",
  neighborhood: "Russian Hill",
  operation_hours: "Brunch Sun 11:00 am–3:00 pm Dinner Wed–Sun 5:30 pm–10:00 pm Happy Hour Wed–Fri 5:30 pm–7:00 pm",
  dining_style: "Casual Elegant",
  dress_code: "Casual Dress",
  parking_details: "Street Parking",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.berbersf.com/",
  phone_number: "(415) 800-7767",
  tag: "award-winning",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/49265159.jpg",
  lat: 37.7961719,
  lng: -122.4244664,
)

file11 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/49265159.jpeg")
r11.photo.attach(io: file11, filename: "49265159.jpeg")

r11_reser1 = Reservation.create!(
  date: "29-07-2022",
  time: "18:00",
  party_size: 2,
  restaurant_id: r9.id,
  user_id: u[10].id,
)

r11_reser2 = Reservation.create!(
  date: "07-09-2022",
  time: "17:30",
  party_size: 2,
  restaurant_id: r11.id,
  user_id: u[0].id,
)

r11_rev1 = Review.create!(
  rating: 3,
  body: "Nice ambiance, food was just OK.",
  user_id: u[10].id,
  restaurant_id: r11.id,
)

r11_rev2 = Review.create!(
  rating: 5,
  body: "Amazing time, delicious food, excellent service",
  user_id: u[0].id,
  restaurant_id: r11.id,
)

r12 = Restaurant.create!(
  name: "Okane",
  address: "669 Townsend Street, San Francisco, CA 94103",
  description: "Okane specializes in izakaya and sushi, providing the Bay Area with an engaging new dining and drinking option that affords guests one of the City’s most authentic Japanese izakaya experiences with an emphasis on traditional dishes.",
  cuisine: "Japanese",
  expense: "$30 and under",
  neighborhood: "SOMA",
  operation_hours: "Lunch Tue–Sun 11:30 am–2:00 pm Dinner Tue–Sun 4:30 pm–9:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "Street Parking",
  payment_options: "AMEX, MasterCard, Visa",
  website: "http://www.okanesf.com/",
  phone_number: "(415) 865-9788",
  tag: "award-winning",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/5/26434411.jpg",
  lat: 37.7705022,
  lng: -122.4051651,
)

file12 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/26434411.jpeg")
r12.photo.attach(io: file12, filename: "26434411.jpeg")

r12_reser1 = Reservation.create!(
  date: "09-08-2022",
  time: "13:00",
  party_size: 2,
  restaurant_id: r9.id,
  user_id: u[1].id,
)

r12_reser2 = Reservation.create!(
  date: "03-09-2022",
  time: "18:30",
  party_size: 2,
  restaurant_id: r12.id,
  user_id: u[2].id,
)

r12_rev1 = Review.create!(
  rating: 3,
  body: "Nice ambiance, food was just OK.",
  user_id: u[1].id,
  restaurant_id: r12.id,
)

r12_rev2 = Review.create!(
  rating: 5,
  body: "Amazing time, delicious food, excellent service",
  user_id: u[2].id,
  restaurant_id: r12.id,
)

r13 = Restaurant.create!(
  name: "Trestle",
  address: "531 Jackson St, San Francisco, CA 94133",
  description: "At Trestle, we remember a time, not too long ago, where people took pause to enjoy a meal in the presence of great company, giving it the reverence and respect deserved. We provide a dining experience served in courses, with the satisfaction and warmth found at a family gathering, creating the foundation to a proper meal.",
  cuisine: "American",
  expense: "$31 to $50",
  neighborhood: "Financial District",
  operation_hours: "Fri, Sat 5:30 pm–10:00 pm Dinner Mon–Thu, Sun 5:30 pm–9:00 pm",
  dining_style: "Home Style",
  dress_code: "Casual Dress",
  parking_details: "Street Parking can be difficult in North Beach. There is a garage located next to the restaurant - please note that we do NOT validate.",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.trestlesf.com/",
  phone_number: "(415) 772-0922",
  tag: "award-winning",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/24094108.jpg",
  lat: 37.7961574,
  lng: -122.4065895,
)

file13 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/24094108.jpeg")
r13.photo.attach(io: file13, filename: "24094108.jpeg")

r13_reser1 = Reservation.create!(
  date: "22-07-2022",
  time: "12:30",
  party_size: 4,
  restaurant_id: r9.id,
  user_id: u[3].id,
)

r13_reser2 = Reservation.create!(
  date: "03-08-2022",
  time: "18:00",
  party_size: 3,
  restaurant_id: r13.id,
  user_id: u[4].id,
)

r13_rev1 = Review.create!(
  rating: 5,
  body: "Great service and excellent food.Highly recommend!",
  user_id: u[3].id,
  restaurant_id: r13.id,
)

r13_rev2 = Review.create!(
  rating: 4,
  body: "Trestle is a great restaurant to add to your weekday dinner rotation.",
  user_id: u[4].id,
  restaurant_id: r13.id,
)

r14 = Restaurant.create!(
  name: "Spinning Bones",
  address: "1205 Park St, Alameda, CA 94501",
  description: "Spinning Bones is a California rotisserie restaurant that specializes in roasted meats with bold flavors. The focus of the menu is slow roasted meats: poultry, pork and beef, rotating on spits over high heat, and basting in their own natural juices.",
  cuisine: "American",
  expense: "$30 and under",
  neighborhood: "Alameda",
  operation_hours: "Wed, Thu, Sun 12:00 pm–8:00 pm Fri, Sat 12:00 pm–9:00 pm",
  dining_style: "Casual Dining",
  dress_code: "Casual Dress",
  parking_details: "Street Parking",
  payment_options: "AMEX, Discover, MasterCard, Visa",
  website: "http://www.spinningbones.com/",
  phone_number: "(510) 263-9290",
  tag: "award-winning",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/28320134.jpg",
  lat: 37.7612131,
  lng: -122.2478458,
)

file14 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/28320134.jpeg")
r14.photo.attach(io: file14, filename: "28320134.jpeg")

r14_reser1 = Reservation.create!(
  date: "25-06-2022",
  time: "12:30",
  party_size: 5,
  restaurant_id: r9.id,
  user_id: u[5].id,
)

r14_reser2 = Reservation.create!(
  date: "13-08-2022",
  time: "18:00",
  party_size: 4,
  restaurant_id: r14.id,
  user_id: u[6].id,
)

r14_rev1 = Review.create!(
  rating: 5,
  body: "We were a party of 5 and ordered quite a variety of food and enjoyed everything we ordered.",
  user_id: u[5].id,
  restaurant_id: r14.id,
)

r14_rev2 = Review.create!(
  rating: 4,
  body: "Food was spot on fantastic, fresh, delicious, & perfectly prepared.",
  user_id: u[6].id,
  restaurant_id: r14.id,
)

r15 = Restaurant.create!(
  name: "Luce - InterContinental San Francisco",
  address: "888 Howard Street, San Francisco, CA 94103",
  description: "Insalata's Restaurant is moving into it's 25th year of the community minded restaurants in San Anselmo. Insalata's receives Bib Gourmand from Michelin for it's 10th year in a row.",
  cuisine: "Contemporary American",
  expense: "$50 and over",
  neighborhood: "SOMA",
  operation_hours: "Breakfast Daily 6:30 am–10:30 am Brunch Sat, Sun 10:30 am–2:30 pm Dinner Wed–Sat 5:30 pm–9:00 pm",
  dining_style: "Fine Dining",
  dress_code: "Smart Casual",
  parking_details: "Valet",
  payment_options: "AMEX, Diners Club, Discover, MasterCard, Visa",
  website: "https://www.lucewinerestaurant.com/",
  phone_number: "Max Pilz: (415) 616-6560",
  tag: "award-winning",
  img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/32137620.jpg",
  lat: 37.7822121,
  lng: -122.4070153,
)

file15 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/32137620.jpeg")
r15.photo.attach(io: file15, filename: "32137620.jpeg")

r15_reser1 = Reservation.create!(
  date: "08-08-2022",
  time: "12:30",
  party_size: 2,
  restaurant_id: r9.id,
  user_id: u[7].id,
)

r15_reser2 = Reservation.create!(
  date: "06-09-2022",
  time: "18:00",
  party_size: 4,
  restaurant_id: r15.id,
  user_id: u[8].id,
)

r15_rev1 = Review.create!(
  rating: 4,
  body: "Always good to go back.There is a new chef who started Friday.Looking forward to seeing his new menu",
  user_id: u[7].id,
  restaurant_id: r15.id,
)

r15_rev2 = Review.create!(
  rating: 5,
  body: "It was a very special evening! The food was absolutely delicious.We definitely will come back.",
  user_id: u[8].id,
  restaurant_id: r15.id,
)

puts "Done!"
# end
