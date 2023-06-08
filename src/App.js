import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
      })
      .catch(err => console.error(err))
    form.reset();   // or, " event.target.reset() "
  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type="email" name="email" id="" placeholder='Email...' /><br />
        <input type="password" name="password" id="" placeholder='Password' /><br />
        <button type="submit">Add user</button>
      </form>

      <h2>Total user: {users.length}</h2>
      {
        users.map(user => <p key={user._id}>{user.email}</p>)
      }
    </div>
  );
}

export default App;
