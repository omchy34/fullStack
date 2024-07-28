##### Work Flow ####

To design this system, you will need to manage user authentication, user roles, certificate request, and approval processes. Here's a step-by-step guide to implementing this:

Frontend (React)
User Authentication:

Use a library like react-router-dom for routing.
Use JWT tokens for authentication. Store the token in localStorage or sessionStorage.
Create a login page and a protected route for authenticated users.
User Role Management:

Store user roles (admin, user) in the JWT token.
Use a context or state management solution like Redux to manage user state across the app.
Certificate Request Flow:

Create a button or link in the navbar for "Certificates".
When clicked, check if the user is eligible to claim a certificate.
If not eligible, display a popup/modal to request a certificate.
Admin Panel:

Create an admin dashboard to manage certificate requests.
List all certificate requests with options to approve or deny.
Backend (Node.js/Express with Mongoose)
User Authentication and Role Management:

Implement JWT authentication.
Create middleware to check user roles and permissions.
Certificate Request Management:

Create a CertificateRequest model in Mongoose with fields like userId, status (pending, approved, denied), etc.
Create endpoints to handle certificate requests and approvals:
POST /api/v1/certificates/request: For users to request certificates.
GET /api/v1/certificates/requests: For admins to view all requests.
PATCH /api/v1/certificates/approve/:id: For admins to approve a request.
PATCH /api/v1/certificates/deny/:id: For admins to deny a request.