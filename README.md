# Simple-Search-Movie-Platform
You can enter the name of any movie you want to know in the input box.

Detailed description：

You will be using two endpoints of the TV Maze API which is an API about TV shows  for your Axios calls.  The search show endpoint where you pass the search term as a query string parameter: http://api.tvmaze.com/search/shows?q=Search_Term_Here  and then you'll get an individual show using the endpoint http://api.tvmaze.com/shows/:id where :id is the ID of the show you are looking up.

You will use these two endpoints to make your axios.get calls depending on which route is called. 

You will be making three routes/pages in your application:

http://localhost:3000/ the main page of this application will provide a search form to start a search of shows for a keyword. 
http://localhost:3000/searchshows this page will make the axios call to the search endpoint and return up to 5 matching results that contain the provided request form param, showSearchTerm
http://localhost:3000/show/:id this page will show all the details of the show with the id matching the provided URL param, id
All other URLS should return a 404
