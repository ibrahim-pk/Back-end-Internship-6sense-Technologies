## Assignment Submission - Back-end Internship, 6sense Technologies
📎 [***Problem Link (Click Here to View)***](https://bird-bag-be1.notion.site/Backend-Development-Challenge-16163fb7ed358081a262c7644962f2ad)
📎 [***Live-Server-Link***](https://back-end-internship-6sense-technologies.onrender.com/)


### Create Category

#### Post Api
http://localhost:5000/api/v1/category/create-category
#### Test Data
```{
  "name": "Electronics",
  "description": "Devices and gadgets for modern life"
}
```
#### Response Data
```{
    "statusCode": 201,
    "success": true,
    "message": "Category created successfully",
    "data": {
        "name": "Electronics",
        "description": "Devices and gadgets for modern life",
        "_id": "6871fd5fdcd8de8dcff599c3",
        "createdAt": "2025-07-12T06:14:55.325Z",
        "updatedAt": "2025-07-12T06:14:55.325Z",
        "__v": 0
    }
}
```

#### Get all categories
http://localhost:5000/api/v1/category/get-categories
#### Resonse Dara
```{
    "statusCode": 200,
    "success": true,
    "message": "Categories fetched successfully",
    "data": [
        {
            "_id": "6871fd5fdcd8de8dcff599c3",
            "name": "Electronics",
            "description": "Devices and gadgets for modern life",
            "createdAt": "2025-07-12T06:14:55.325Z",
            "updatedAt": "2025-07-12T06:14:55.325Z",
            "__v": 0
        },
        {
            "_id": "6871fe3bfc05770cce30a295",
            "name": "Electronicsss",
            "description": "Devices and gadgets for modern life",
            "createdAt": "2025-07-12T06:18:35.646Z",
            "updatedAt": "2025-07-12T06:18:35.646Z",
            "__v": 0
        }
    ]
}

```

#### Delete category by id
http://localhost:5000/api/v1/category/categories/category_Id
http://localhost:5000/api/v1/category/categories/6871fe3bfc05770cce30a295

#### Response Data

```{
    "statusCode": 200,
    "success": true,
    "message": "Category deleted successfully"
}
```

#### Edit Category
http://localhost:5000/api/v1/category/categories/category_Id
http://localhost:5000/api/v1/category/categories/6871fd5fdcd8de8dcff599c3

#### Response Data
```{
    "statusCode": 200,
    "success": true,
    "message": "Category updated successfully",
    "data": {
        "_id": "6871fd5fdcd8de8dcff599c3",
        "name": "Electronics",
        "description": "Devices and gadgets for modern life",
        "createdAt": "2025-07-12T06:14:55.325Z",
        "updatedAt": "2025-07-12T06:26:35.641Z",
        "__v": 0
    }
}
```

#### Create sub-category 
http://localhost:5000/api/v1/sub-category/create-subcategory

#### Test-Data
```{

  "name": "Smartphones",
  "category": "6871fd5fdcd8de8dcff599c3"
}
```
```
# single sub-category
http://localhost:5000/api/v1/sub-category/subcategories/sub-category-id
# Edit sub-category
http://localhost:5000/api/v1/sub-category/subcategories/sub-category-id
# Delete sub-category
http://localhost:5000/api/v1/sub-category/subcategories/sub-category-id
```

### Create Product-APi
http://localhost:5000/api/v1/product/create-product
### Test Data
```{
  "name": "iPhone 16 Pro Max",
  "description": "The newest iPhone with advanced camera and performance",
  "price": 1599,
  "discount": 10,
  "image": "https://example.com/images/iphone16promax.jpg",
  "status": "In Stock",
  "subcategory": "6872021500f80b8c16e1a072"
}
```
### Response Data
```{
    "statusCode": 201,
    "success": true,
    "message": "Product created successfully",
    "data": {
        "name": "iPhone 16 Pro Max",
        "description": "The newest iPhone with advanced camera and performance",
        "price": 1599,
        "discount": 10,
        "image": "https://example.com/images/iphone16promax.jpg",
        "status": "In Stock",
        "productCode": "98b902d-0iphoprax16",
        "subcategory": "6872021500f80b8c16e1a072",
        "_id": "68720799b2d277bad8fbc931",
        "createdAt": "2025-07-12T06:58:33.914Z",
        "updatedAt": "2025-07-12T06:58:33.914Z",
        "__v": 0
    }
}
```

### Get Product by filter
```
http://localhost:5000/api/v1/product/get-products
{
    "statusCode": 200,
    "success": true,
    "message": "Filtered products fetched successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 3
    },
    "data": [
        {
            "_id": "68720799b2d277bad8fbc931",
            "name": "iPhone 16 Pro Max",
            "description": "The newest iPhone with advanced camera and performance",
            "price": 1599,
            "discount": 10,
            "image": "https://example.com/images/iphone16promax.jpg",
            "status": "In Stock",
            "productCode": "98b902d-0iphoprax16",
            "subcategory": {
                "_id": "6872021500f80b8c16e1a072",
                "name": "Smartphones"
            },
            "createdAt": "2025-07-12T06:58:33.914Z",
            "updatedAt": "2025-07-12T06:58:33.914Z",
            "__v": 0,
            "originalPrice": 1599,
            "finalPrice": 1439.1
        },
        {
            "_id": "687209f49f9da41c63b5d9b1",
            "name": "Alpha Sorter",
            "description": "Alpha Sorter",
            "price": 1599,
            "discount": 10,
            "image": "https://example.com/images/iphone16promax.jpg",
            "status": "In Stock",
            "productCode": "0231dd7-0alport9",
            "subcategory": {
                "_id": "6872021500f80b8c16e1a072",
                "name": "Smartphones"
            },
            "createdAt": "2025-07-12T07:08:36.721Z",
            "updatedAt": "2025-07-12T07:08:36.721Z",
            "__v": 0,
            "originalPrice": 1599,
            "finalPrice": 1439.1
        },
        {
            "_id": "687238049f9da41c63b5d9b6",
            "name": "xabc ypqrab",
            "description": "test",
            "price": 1599,
            "discount": 10,
            "image": "https://example.com/images/iphone16promax.jpg",
            "status": "In Stock",
            "productCode": "3f8d4eb-1abcpqr8",
            "subcategory": {
                "_id": "6872021500f80b8c16e1a072",
                "name": "Smartphones"
            },
            "createdAt": "2025-07-12T10:25:08.293Z",
            "updatedAt": "2025-07-12T10:25:08.293Z",
            "__v": 0,
            "originalPrice": 1599,
            "finalPrice": 1439.1
        }
    ]
}
```
### Filter product by category,name and pagination
```
http://localhost:5000/api/v1/product/get-products?subcategory=6872021500f80b8c16e1a072
http://localhost:5000/api/v1/product/get-products?search=iPhone
http://localhost:5000/api/v1/product/get-products?subcategory=6872021500f80b8c16e1a072&search=iPhone&page=1&limit=10

{
    "statusCode": 200,
    "success": true,
    "message": "Filtered products fetched successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 1
    },
    "data": [
        {
            "_id": "68728bcae169ff4a0659c0e1",
            "name": "Alpha Sorter",
            "description": "Test description",
            "price": 200,
            "discount": 50,
            "image": "https://example.com/images/iphone16promax.jpg",
            "status": "In Stock",
            "productCode": "0231dd7-0alport8",
            "subcategory": {
                "_id": "6872021500f80b8c16e1a072",
                "name": "Smartphones"
            },
            "createdAt": "2025-07-12T16:22:34.173Z",
            "updatedAt": "2025-07-12T16:22:34.173Z",
            "__v": 0,
            "originalPrice": 200,
            "finalPrice": 100
        },
        {
            "_id": "68720799b2d277bad8fbc931",
            "name": "iPhone 16 Pro Max",
            "description": "The newest iPhone with advanced camera and performance",
            "price": 1599,
            "discount": 10,
            "image": "https://example.com/images/iphone16promax.jpg",
            "status": "In Stock",
            "productCode": "98b902d-0iphoprax16",
            "subcategory": {
                "_id": "6872021500f80b8c16e1a072",
                "name": "Smartphones"
            },
            "createdAt": "2025-07-12T06:58:33.914Z",
            "updatedAt": "2025-07-12T06:58:33.914Z",
            "__v": 0,
            "originalPrice": 1599,
            "finalPrice": 1439.1
        }
    ]
}
```

### Get Single Product by Id
http://localhost:5000/api/v1/product/products/product-id

### Update product by id
http://localhost:5000/api/v1/product/products/687238049f9da41c63b5d9b6
### Test Data
```{
  "name": "iPhone 15 Pro Max",
  "description": "The newest iPhone with advanced camera and performance",
  "price": 1599,
  "discount": 10,
  "image": "https://example.com/images/iphone16promax.jpg",
  "status": "In Stock",
  "subcategory": "6872021500f80b8c16e1a072"
}
```
### Respone Data
```
{
    "statusCode": 200,
    "success": true,
    "message": "Product updated",
    "data": {
        "_id": "687238049f9da41c63b5d9b6",
        "name": "iPhone 15 Pro Max",
        "description": "The newest iPhone with advanced camera and performance",
        "price": 1599,
        "discount": 10,
        "image": "https://example.com/images/iphone16promax.jpg",
        "status": "In Stock",
        "productCode": "f9cbf72-0iphoprax16",
        "subcategory": "6872021500f80b8c16e1a072",
        "createdAt": "2025-07-12T10:25:08.293Z",
        "updatedAt": "2025-07-12T11:29:30.505Z",
        "__v": 0
    }
}
```

### Delete  Product by Id
http://localhost:5000/api/v1/product/products/product-id

