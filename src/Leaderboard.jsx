import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from './firebase';

import { Header, Footer } from "./Layout"


export default function LeaderBoard() {
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
  }, [db]);

  const getLeaderBoardRows = () => {
    const filteredUsers = users.filter((user) => user.lifetimePoints);
    const mappedUsers = filteredUsers.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.name ? user.name : "Unknown"}</td>
        <td>{user.lifetimePoints}</td>
      </tr>
    ));

    return mappedUsers.slice(0, 10);;
  }

  return (
    <>
      <Header />

      <div className="leaderboard-main">
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
            { getLeaderBoardRows() }
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}
