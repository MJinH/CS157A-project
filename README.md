# CS157A-project

## Goals and Description of the Applicatio

The goal of this application is to help students manage courses and make sure the
ratings of instructors for their upcoming semester. Every student doesn’t take a class
without checking the ratings of the instructor for that class. Through this application, a
student is not only able to check the reviews of instructors that they want to look for,
but also write comments about the instructors. The entire review is anonymous and the
reviews are visible for other students. In addition to review and comment
functionality, a student can add a particular course into the enrollment cart for the
upcoming semester and remove it anytime they want. Moreover, a student can upload
profile images in profile pages and add other students as friends.


## Application/Functional Requirements and Architecture

This application was implemented using React.js for frontend, Node.js for backend,
and MySQL as database server. Additionally, to interact with frontend and backend,
the promise based HTTP client for Node.js was used.This application is based on
3-tier architecture where a user can interact with user interface and this user interface
responsible for user interaction and data presentation. Through the user interface,
users can send requests to the server for performing operations. Once the request is
processed, it goes through the middleware and the middleware protects the data from
the direct access by the clients and stores the data into the database server. After the
operation is completed, the request is redirected and delivers the response back to the
user. The application has a login, register, cart and profile page for the user
interaction. If a user interacts in one of these pages, the request is sent to the server
and performs the operations


## Design Decision and Implementation Details

### This application consists of 5 pages: register, login, main, cart, profile.


### Login Page
Once the application is executed, it displays a login page as the default page. If a user
doesn’t have an account, they need to create a new account in a register page. The
register button on the bottom of the login container navigates a user to the registration
page. Once creating a new account is done, the user information will be fetched from
user authentication and stored into the user database using a POST request.

### Register Page
A user can create a new account in the register page. The minimum length of the user
name and password is 5 and the maximum length is 20. If the conditions are met, a
new account will be created and navigate a user back to the login page.

### Main Page
A user can search for courses and instructors in a main page by using the search bar to
filter by section and/or mode of instruction. Once a main page is loaded, it will fetch
the course and instructor information from the database using a GET request and
display it to the user. Additionally, using a search bar a user can get suggestions for
courses and instructors and the more the user types, the suggestions become more
narrow due to partial matching. A user can also enroll or like a particular course by
clicking the corresponding icons. If one of the icons is clicked, it makes a POST
request and stores user name and course name into the database. In addition to
enrollment and like functionality, a user also can write a comment about specific
instructors. The entire review is anonymous and the reviews are visible for other
students.

### Cart Page
In this page, a user can view courses they added in a main page. A user can remove or
unenroll a course they don’t want anymore. Once the page is loaded, it will fetch the
user information and all the courses that are in the course table by making a GET
request and display the courses that the current user enrolled.

### Profile Page
A user can visit the profile section of user settings and update or upload an image they
would like to use as their profile. If they upload a new image or update an existing
image, a GET request will be made to store the name of the image in the database. In
addition to uploading images, they can find other users on the bottom of the page and
add them as a friend if they want.



## Demonstration
Once a user runs the application, a login page will be shown as the default page. 
Below image shows the login page. If a user clicks the register button, it navigates a user to the register page.
![Screenshot (32)](https://user-images.githubusercontent.com/97130553/204777932-90742c7f-629f-4f1f-943f-eaad705d60b0.png)


Below is the registration page. The minimum length of username and password is 5. 
If the condition is not met, a warning message will appear. Once the registration is done, the user will be navigated back to the login page.
![Screenshot (33)](https://user-images.githubusercontent.com/97130553/204777992-5637a3a2-371e-4929-8fb2-37340fe8ba20.png)


After successfully logging into account, it will show the list of CS courses with the like and cart icons like below image. 
A user can use a search bar to get suggestions for courses and instructors and the more the user types, the suggestions become more narrow due to partial matching.
![Screenshot (34)](https://user-images.githubusercontent.com/97130553/204778067-b84d0c7b-cf4f-4ca5-b364-25451d7a3596.png)


Below image shows the list of instructors of CS courses and if a user clicks the instructor div element, the reviews will appear.
A user can write a new comment about a particular instructor using the input bar on the bottom of the reviews and by clicking the add button.
![Screenshot (35)](https://user-images.githubusercontent.com/97130553/204778117-93be1fdb-3dcb-41f5-b5b9-300ebc1d0979.png)

In a cart page, a user can find the courses they enrolled and as they enroll a new course, the number of cart icon on the top bar will change. 
A user can remove or unenroll a course they don’t want anymore.
![Screenshot (36)](https://user-images.githubusercontent.com/97130553/204778160-0c351897-ce7f-4c62-bdd2-a613f6ef0b91.png)


Lastly, the below image shows a profile page. In this page, a user can update or upload an image they would like to use as their profile by clicking the icon and upload button. 
The other users will appear on the bottom of the page as shown. 
![Screenshot (37)](https://user-images.githubusercontent.com/97130553/204778226-97914741-d464-4799-bc3d-3fd9ec641bd5.png)

