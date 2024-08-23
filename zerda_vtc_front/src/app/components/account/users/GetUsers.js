import React, { useState, useEffect } from "react";
import './GetUsers.css';
import { getallUsers } from "../../../api/backend/UserAction";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        // const response = await axios.get("/api/users"); // Replace with your actual API endpoint
        const response = await getallUsers();
        setUsers(response.data);
        console.log(response);   

        setUsers(response.data); // Adjust according to the API response structure
        

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>wait please loading list...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Users List</h1>
      {users && users.length > 0 ? (
        <ol>
          {users.map((user) => (
            <li key={user.id}>
              <div className="user-info">
                <div className="user-details">
                  <p className="name">
                    {user.name},  {user.lastName}
                  </p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;