# 📘 API Documentation

This document provides detailed information about the available API endpoints for the **Request Management Server**.

Base URL on a local machine:  
http://localhost:3000


### GET `/requests`

Retrieve a list of user requests. Supports filtering by status or date.

#### 🔸 Query Parameters

| Parameter   | Type     | Description                                                       |
|-------------|----------|-------------------------------------------------------------------|
| `status`    | string   | Filter requests by status (`New`, `In progress`, `Completed`, `Cancelled`) |
| `date`      | string   | Filter requests created on a specific date (`YYYY-MM-DD`)         |
| `startDate` | string   | Filter requests created on or after this date (`YYYY-MM-DD`)      |
| `endDate`   | string   | Filter requests created on or before this date (`YYYY-MM-DD`)     |

ℹ️ If both `startDate` and `endDate` are provided, the API returns requests between the two dates (inclusive).

#### ✅ Example Requests

```http
GET /requests
GET /requests?status=New
GET /requests?date=2025-05-28
GET /requests?startDate=2025-05-01&endDate=2025-05-28
✅ Example Response
```

```json
[
  {
    "id": 1,
    "subject": "Fix broken printer",
    "text": "The printer in room 301 isn't working.",
    "status": "New",
    "solutionText": null,
    "cancelReason": null,
    "createdAt": "2025-05-28T09:00:00.000Z",
    "updatedAt": "2025-05-28T09:00:00.000Z"
  }
]
```

## 🧾 Error Responses
The API will return standard HTTP status codes for errors:

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 400  | Bad Request (e.g., invalid query format) |
| 404  | Not Found                                |
| 500  | Internal Server Error                    |