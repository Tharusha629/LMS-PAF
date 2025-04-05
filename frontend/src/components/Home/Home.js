import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    loadInventory();
  }, [])

  const loadInventory = async () => {
    const result = await axios.get("http://localhost:8080/inventory")
    setInventory(result.data);
  }

  //search function
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = inventory.filter(
    (item) =>
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>

      <button onClick={() => (window.location.href = '/home')}>Home</button>
      <button onClick={() => (window.location.href = '/userProfile')}>Profile</button>

      <div>
        <h1>Inventory Item</h1>

        <input
          type='text'
          placeholder='search by id and name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
        </input>
        <div>

          <div>
            {filteredData.map((item, index) => (
              <div key={index}>
                <p>{item.itemId}</p>
                <div>
                  <img src={`http://localhost:8080/uploads/${item.itemImage}`}
                    alt={item.itemName}
                    width="50" height="50" />
                </div>
                <p>{item.itemName}</p>
                <p>{item.itemCategory}</p>
                <p>{item.itemQty}</p>
                <p>{item.itemDetails}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
