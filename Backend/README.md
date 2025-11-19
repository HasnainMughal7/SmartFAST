Routes:


Admin Dashboard Get Profiles:
GET /api/dashboard/profiles

Admin Dashboard get Specific Profile:
Get /api/dashboard/profiles/:id

Admin Dashboard Delete Profile
DELETE /api/dashboard/profile/:id

Admin Dashboard Get Rooms:
GET /api/dashboard/rooms

Admin Dashboard Add room in the list:
POST /api/dashboard/rooms/add (block, number, floor)

Admin Dashboard Get Queries (Alerts):
GET /api/dashboard/queries/


Admin Dashboard create Profiles:
 POST /api/auth/profile/create (username,password,email,role)

Admin Dashboard UpdatePassword:

User add Query: (authorized)
POST /api/query/add 

User login:
POST /api/auth/login (username, password) -> cookie; 7d

User Data:
GET /api/auth/profile/get

POST /api/dashboard/profile/

To send Message;
POST /api/message (content)


To get all messages:
GET /api/message/all