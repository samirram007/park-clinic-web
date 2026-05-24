# Backend API Implementation Guide: Pagination, Searching, and Filtering

To ensure optimal performance and user experience on the frontend, the backend API for `contact-messages` should implement the following standards.

## 1. Pagination
The API should support cursor-based or offset-based pagination. Offset-based is recommended for simplicity unless data volume is extremely high.

**Request Parameters:**
- `page`: (Integer) Current page number (default: 1).
- `per_page`: (Integer) Number of records per page (default: 10).

**Response Structure:**
Wrap the data in a response object that includes metadata:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "current_page": 1,
    "last_page": 10,
    "per_page": 10
  }
}
```

## 2. Filtering
Support filtering by status to allow the frontend to easily fetch specific subsets of data.

**Request Parameters:**
- `status`: (String) Filter by 'read' or 'unread'.
  - `GET /admin/contacts?status=unread`

## 3. Searching
Implement a search endpoint to allow searching by name, email, or subject.

**Request Parameters:**
- `search`: (String) Search query string.
  - `GET /admin/contacts?search=JohnDoe`

## 4. Combined Usage
The API should handle simultaneous application of these parameters.
- Example: `GET /admin/contacts?page=1&per_page=10&status=unread&search=urgent`

---
*Please ensure all filters and searches are case-insensitive and sanitised to prevent injection attacks.*
