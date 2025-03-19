## :wrench: Constants

- [getBasket](#gear-getbasket)
- [createBasket](#gear-createbasket)
- [addItemToBasket](#gear-additemtobasket)
- [removeItemFromBasket](#gear-removeitemfrombasket)

### :gear: getBasket

Endpoint for receiving the basket.
It checks for the user ID using `getAuthData()`.
If the user is not signed in, a GUID is expected for idempotent handling of basket logic.

| Constant | Type |
| ---------- | ---------- |
| `getBasket` | `any` |

Parameters:

* `params`: - The parameters for the request.
* `params.guid`: - The GUID of the basket, which is optional.


Examples:

```javascript
// Example request
GET /basket?guid=your-guid-here
```


### :gear: createBasket

Endpoint for creating a new basket.

It checks for the user ID using `getAuthData()`.
If the user is not signed in, a GUID is expected for idempotent handling of basket logic.

| Constant | Type |
| ---------- | ---------- |
| `createBasket` | `any` |

Parameters:

* `params`: - The parameters for the request.
* `params.guid`: - The GUID of the basket. This is optional and is used for identifying the basket 
    when the user is not authenticated.


Examples:

```javascript
// Example request to create a new basket
// POST /basket
// Content-Type: application/json

{
  "guid": "your-guid-here" // Optional GUID for the basket
}
```

###
 ```javascript
// Example response for a successful basket creation
{
  "basket": {
    "id": "new-basket-id",
    "items": [] // Initially empty basket
  }
}
```


### :gear: addItemToBasket

Endpoint for adding an item to the client basket.

It checks for the user ID using `getAuthData()`.
If the user is not signed in, a GUID is expected for idempotent handling of basket logic.

| Constant | Type |
| ---------- | ---------- |
| `addItemToBasket` | `any` |

Parameters:

* `params`: - The parameters for the request.
* `params.guid`: - The GUID of the basket. This is optional and is used for identifying the basket 
    when the user is not authenticated.
* `params.basketItemCreate`: - The item to be added to the basket, containing details such as 
  item ID and quantity.


Examples:

```javascript
// Example request to add an item to the basket
POST /basket/add-item
Content-Type: application/json

{
  "guid": "your-guid-here", // Optional GUID for the basket
  "basketItemCreate": {
    "itemId": "item-id",     // ID of the item to add
    "quantity": 1            // Quantity of the item
  }
}
```
```javascript
// Example response for a successful item addition
{
  "basket": {
    "id": "basket-id",
    "items": [
      {
        "itemId": "item-id",
        "quantity": 1
      }
    ]
  }
}
```


### :gear: removeItemFromBasket

Endpoint for removing an item from the basket.

It checks for the user ID using `getAuthData()`.
If the user is not signed in, a GUID is expected for idempotent handling of basket logic.

| Constant | Type |
| ---------- | ---------- |
| `removeItemFromBasket` | `any` |

Parameters:

* `params`: - The parameters for the request.
* `params.guid`: - The GUID of the basket. This is optional and is used for identifying the basket 
    when the user is not authenticated.
* `params.basketItemId`: - The ID of the item to be removed from the basket.


Examples:

```javascript
// Example request to remove an item from the basket
// DELETE /basket/remove-item
// Content-Type: application/json

{
  "guid": "your-guid-here", // Optional GUID for the basket
  "basketItemId": 123       // ID of the item to remove
}
```
```javascript
// Example response for a successful item removal
{
  "basket": {
    "id": "basket-id",
    "items": [] // The item has been removed
  }
}
```



