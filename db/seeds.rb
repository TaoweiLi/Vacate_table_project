# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Restaurant.destroy_all
  Reservation.destroy_all
  Review.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!("users")
  ApplicationRecord.connection.reset_pk_sequence!("restaurants")

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
  users = []
  10.times do
    user = User.create!({
      first_name: Faker::Name.unique.first_name,
      last_name: Faker::Name.unique.last_name,
      email: Faker::Internet.unique.email,
      phone_number: Faker::Number.number(digits: 10),
      password: "123456",
    })
    users << user
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
  )

  # file1 = URI.open("https://app-vtable-seeds.s3.us-west-1.amazonaws.com/25898035.jpeg")
  # r1.photo.attach(io: file1, filename: "25898035.jpeg")

  r1_reser1 = Reservation.create!(
    date: "10-12-2020",
    time: "17:00",
    party_size: 3,
    restaurant_id: r1.id,
    user_id: u1.id,
  )

  r1_reser2 = Reservation.create!(
    date: "15-12-2020",
    time: "20:00",
    party_size: 7,
    restaurant_id: r1.id,
    user_id: u1.id,
  )

  r1_rev1 = Review.create!(
    rating: 3,
    review: "AAAAA BLA BLA WA LA AWASSA",
    user_id: u1.id,
    reservation_id: r1_reser2.id,
    restaurant_id: r1.id,
  )

  r1_rev2 = Review.create!(
    rating: 5,
    review: "BBBBB BLA BLA WA LA AWASSA",
    user_id: u1.id,
    reservation_id: r1_reser1.id,
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
  )

  r2_reser1 = Reservation.create!(
    date: "10-12-2020",
    time: "17:00",
    party_size: 3,
    restaurant_id: r1.id,
    user_id: u1.id,
  )

  r2_reser2 = Reservation.create!(
    date: "15-12-2020",
    time: "20:00",
    party_size: 7,
    restaurant_id: r1.id,
    user_id: u1.id,
  )

  r2_rev1 = Review.create!(
    rating: 3,
    review: "AAAAA BLA BLA WA LA AWASSA",
    user_id: u1.id,
    reservation_id: r1_reser2.id,
    restaurant_id: r1.id,
  )

  r2_rev2 = Review.create!(
    rating: 5,
    review: "BBBBB BLA BLA WA LA AWASSA",
    user_id: u1.id,
    reservation_id: r1_reser1.id,
    restaurant_id: r1.id,
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
    dress_code: "Casual Casual",
    parking_details: "Street Parking",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "http://www.monalisamaremonti.com/",
    phone_number: "(415) 398-1300",
    tag: "new_to_vtable",
    img: "https://resizer.otstatic.com/v2/photos/wide-huge/3/49228648.jpg",
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
    dress_code: "Casual Casual",
    parking_details: "residential and metered parking, there is a city parking lot with meters at 324 8th avenue lot. Shh don't tell everyone but the bus stop in front of the restaurant allows for parking after 8pm",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "http://www.heritagerestaurantbar.com/",
    phone_number: "(415) 386-2200",
    tag: "new_to_vtable",
    img: "https://resizer.otstatic.com/v2/photos/wide-huge/1/25544252.jpg",
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
  )

  r15 = Restaurant.create!(
    name: "Luce - InterContinental San Francisco",
    address: "120 Sir Francis Drake Blvd, San Anselmo, CA 94960",
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
  )

  puts "Done!"
end
