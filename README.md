**TAXI 24 RESTful API**
----
  Returns json data about Drivers, Riders, and Trips.

* **URL FOR GETTING THE LIST OF ALL DRIVERS**

  /drivers/

* **URL FOR GETTING A SPECIFIC DRIVER**

  /drivers/:driverId

* **URL FOR GETTING THE LIST OF ALL TRIPS**

  /trips/

* **URL FOR GETTING ALL ACTIVE TRIPS**

  /trips/:state

* **URL FOR COMPLETING A TRIP**

  /trips/:tripId

* **URL FOR GETTING A LIST OF ALL RIDERS**

  /riders/

* **URL FOR GETTING A SPECIFIC RIDER**

  /riders/:riderId

* **Method:**
  
  `GET` | `POST` | `DELETE` | `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[mongoose.Types.ObjectId]`

* **Data Params**

  `{ "name": "Firstname Lastname", "location": "41 24.2028, 2 10.4418" }`

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ "name": "Christian Ndizeye", "phone": 3242, "_id": "5cfa526bcf79572b28700046", "request": { "type": "GET", "url": "http://localhost:3000/riders/5cfa526bcf79572b28700046" } }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not found" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No valid entry found for provided ID" }`

  OR

  * **Code:** 500 ID WHICH DOESN'T EXIST <br />
    **Content:** `{ error : "Cast to ObjectId failed for value ---" }`
