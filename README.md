# mock9

# Social Media App

## Instructions:

- Read the entire question carefully for at least 15 mins, understand it and then code it.
- Commit your code every 30min with a proper commit message to your repository (we will monitor every commit)
- Use **Node, Express, Mongo (NEM)** for backend.

---

## Problem Statement

The task is to create a backend for a Social Media app that allows users to post, like and comment on posts.

## **Instructions:**

The system should be built using **Node.js, Express.js, and MongoDB (NEM)** as the backend stack.

## **Backend:**

### **User Model**

```yaml
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}
```

### **Post Model**

```yaml
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}
```

The following API routes should be developed to achieve the required functionality:

- ****Populate all the Object ID’s in the API response.**
- **** Use token based authorisation for all the protected routes, return 401 Unauthorized as response if not.**

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. Hash the password on store. | 201 |
| POST | /api/login | This endpoint should allow users to login. Return JWT token on successful login. | 201 |
| GET | /api/users | This endpoint should return a list of all registered users.  | 200 |
| GET | /api/users/:id/friends | This endpoint should return a list of all friends of a specific user identified by its ID. | 200 |
| POST | /api/users/:id/friends | This endpoint should allow the user to send a friend request to another user identified by its ID.
(Protected Route) | 201 |
| PUT / PATCH | /api/users/:id/friends/:friendId | This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID.
(Protected Route) | 204 |
| GET | /api/posts | This endpoint should return a list of all posts. | 200 |
| POST | /api/posts | This endpoint should allow the user to create a new post.
(Protected Route) | 201 |
| PUT / PATCH | /api/posts/:id | This endpoint should allow users to update the text or image of a specific post identified by its ID.
(Protected Route) | 204 |
| DELETE | /api/posts/:id | This endpoint should allow users to delete a specific post identified by its ID.
(Protected Route) | 202 |
| POST | /api/posts/:id/like | This endpoint should allow users to like a specific post identified by its ID.
(Protected Route) | 201 |
| POST | /api/posts/:id/comment | This endpoint should allow users to comment on a specific post identified by its ID.
(Protected Route) | 201 |
| GET | /api/posts/:id | This endpoint should return the details of a specific post identified by its ID. | 200 |

---

**Important Note :**

- **Write proper documentation for your API’s clearly specifying what should be the body of your POST API’s, what are the different response API will return. (On your GitHub Readme).**
- **Make a video demonstrating that all the API endpoints are working correctly and giving right expected output. Use Postman or ThunderClient to demonstrate this.**
- **Make sure the video is demonstrating working of all the endpoints clearly in detail, failing to do so may after your scores.**
