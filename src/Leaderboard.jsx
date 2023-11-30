import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from './firebase';
import './Leaderboard.css';

const Leaderboard = (user) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'Users');
        const q = query(usersRef, orderBy('lifetimePoints', 'desc'));
        const usersSnapshot = await getDocs(q);

        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Lifetime Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user1, index) => (
            <tr key={user1.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user1.lifetimePoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
