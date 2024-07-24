![Logo](client-side/src/1.png)



# Art-Marche

Welcome to the Art Work Marketplace! This is a web application where users can upload, explore, modify, and delete art pieces. Users can showcase their own artwork or share others' art, making it a dynamic platform for art enthusiasts.




## Features

- User Authentication: Secure user authentication allowing users to sign up, log in, and manage their profiles.
- Media Upload and Storage: Efficient handling of media uploads and storage, allowing users to upload images of their artwork.
- Edit uploads: Users can edit the uploaded artwork information.
- Explore Art: Users can explore the uploaded artwork, search and view details, and interact with the artist.
- 







## API Reference

#### Get all items

```http
  POST /api/auth/register
```
* Description: register an user account

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | **Required**. The desired username |
| `email` | `string` | **Required**. The desired email |
| `password` | `string` | **Required**. The desired password |


```http
  POST /api/auth/login
```
* Description: user login


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | **Required**. The desired username |
| `password` | `string` | **Required**. The desired password |


```http
  POST /api/auth/googleauth
```
* Description: user login via Google OAuth

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. The Google OAuth token |


```http
  GET /api/auth/logout
```
* Description: user log out from their account

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

.............................................................................................................................................................................................
.............................................................................................................................................................................................



```http
  POST /api/user/update/:id
```
* Description: update user profile

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the user to update.

**Request Body:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | **Optional**. The new username |
| `email` | `string` | **Optional**. The new email |
| `password` | `string` | **Optional**. The new password |


```http
  DELETE /api/user/delete/:id
```
* Description: delete user account

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the user to delete.|



```http
  GET /api/user/user-art-listing/:id
```
* Description: retrieve a list of art pieces uploaded by a specific user identified by their ID.

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the user whose art listing is to be retrieved.|


```http
  GET /api/user/:id
```
* Description: retrieve details of a specific user identified by their ID.

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the user to retrieve|

.............................................................................................................................................................................................
.............................................................................................................................................................................................

```http
  POST /api/listing/createlist
```
* Description: create a new listing
**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**Request Body:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `listingName` | `string` | **Required**. The title of the listing |
| `description` | `string` | **Required**. The description of the listing  |
| `artist` | `string` | **Required**. The name of the user who upload the listing |
| `source` | `string` | **Required**. The source of the listing |
| `artMedium` | `string` | **Required**. The artMedium of the listing |
| `price` | `number` | **Required**. The price of the listing |
| `paintUrls` | `string` | **Required**. The url of the listing |


```http
  DELETE /api/listing/deletelist/:id
```
* Description: delete a listing
**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the listing to delete.|


```http
  POST /api/listing/editlist/:id
```
* Description: edit a listing

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the listing to edit.|

**Request Body:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `listingName` | `string` | **Optional**. The title of the listing |
| `description` | `string` | **Optional**. The description of the listing  |
| `artist` | `string` | **Optional**. The name of the user who upload the listing |
| `source` | `string` | **Optional**. The source of the listing |
| `artMedium` | `string` | **Optional**. The artMedium of the listing |
| `price` | `number` | **Optional**. The price of the listing |
| `paintUrls` | `string` | **Optional**. The url of the listing |


```http
  GET /api/listing/getlist/:id
```
* Description: get a listing

**Header:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. The Bearer token obtained during login. |

**URL Parameters:**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. ID of the listing to retrieve.|

```http
  GET /api/listing/getsearch
```
* Description: search existing listings

**Query Parameters**
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `keyword` | `string` | **Optional**. Keyword used to search a listing |
| `source` | `string` | **Optional**. The source of the listing used for searching |
| `artMedium` | `string` | **Optional**. The artMedium of the  listing used for searching|


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Storage:** MongoDB

## License

[MIT](https://choosealicense.com/licenses/mit/)

