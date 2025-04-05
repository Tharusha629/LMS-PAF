import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
function DisplayItem() {

    const [inventory, setInventory] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadInventory();
    }, [])

    const loadInventory = async () => {
        const result = await axios.get("http://localhost:8080/inventory")
        setInventory(result.data);
    }
    const UpdateNavigate = (id) => {
        window.location.href = `/updateitem/${id}`;
    }

    //delete function
    const deleteItem = async (id) => {
        //display confirmation message
        const confirmationMessage = window.confirm(
            "Are you sure you want to delete this item?"
        )
        if (confirmationMessage) {
            try {
                //send delet request
                await axios.delete(`http://localhost:8080/inventory/${id}`)
                //after delete, reload inventory data
                loadInventory();
                //display success message
                alert("Item deleted Successfully")

            } catch (error) {
                //display error message
                alert("Error Deleting Item")
            }
        }
    }

    //Pdf Generation
    const generatePdf = (inventory) => {
        const doc = new jsPDF("portrait");

        //PDF Title
        doc.text("Inventory item List", 14, 10);

        //prepare data fro the table
        const tableData = inventory.map((item) => [
            item.itemId,
            item.itemName,
            item.itemCategory,
            item.itemQty,
            item.itemDetails,
        ]);

        //Add Tabele to pdf
        doc.autoTable({
            head: [['Item ID', 'Item Name', 'Category', 'Quantity', 'Details']],
            body: tableData,
            startY: 20,
        });

        //save the pdf
        doc.save("inventory_item_list.pdf");
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
            <h1>Inventory Item</h1>
            <button onClick={()=>(window.location.href='/additem')}>Add Items</button>
            <button onClick={() => generatePdf(inventory)}>Generate PDF</button>
            <input
                type='text'
                placeholder='search by id and name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            >
            </input>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item </th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemId}</td>
                            <td>
                                <img src={`http://localhost:8080/uploads/${item.itemImage}`}
                                    alt={item.itemName}
                                    width="50" height="50" />
                            </td>
                            <td>{item.itemName}</td>
                            <td>{item.itemCategory}</td>
                            <td>{item.itemQty}</td>
                            <td>{item.itemDetails}</td>
                            <td>
                                <button onClick={() => UpdateNavigate(item.id)}>Update</button>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayItem
