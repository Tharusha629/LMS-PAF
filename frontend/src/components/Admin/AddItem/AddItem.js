import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function AddItem() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState({
        itemId: '',
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: '',
        itemImage: ''
    });
    const { itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

    const onInputChange = (e) => {
        if (e.target.name === 'itemImage') {
            setInventory({ ...inventory, itemImage: e.target.files[0] });

        } else {
            setInventory({ ...inventory, [e.target.name]: e.target.value });
        }
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", inventory.itemImage);
        let imageName = "";

        try {
            const response = await axios.post("http://localhost:8080/inventory/itemImg", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            imageName = response.data;
        } catch (error) {
            alert("error uploading image");
            return;
        }

        const updateInventory = { ...inventory, itemImage: imageName };
        await axios.post("http://localhost:8080/inventory", updateInventory);
        alert("Item added successfully")
        window.location.reload();
    }


    const generateItemId = () => {
        const prefix = "ID";
        const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
        return `${prefix}${randomNumber}`;
    }
    useEffect(() => {
        setInventory((prevInputs) => ({
            ...prevInputs,
            itemId: generateItemId(),
        }));
    }, []);
    return (
        <div>
            <div>
                <p className='auth_topic'>Add Item</p>
                <div className="from_vontiner">
                    <div className="from_sub_coon">
                        <form id="itemForm" onSubmit={(e) => onsubmit(e)}>
                            <label for="itemId">Item ID:</label><br />
                            <input type="text" id="itemId" name="itemId" onChange={(e) => onInputChange(e)} value={itemId} readOnly /><br />

                            <label for="itemName">Item Name:</label><br />
                            <input type="text" id="itemName" name="itemName" onChange={(e) => onInputChange(e)} value={itemName} required /><br />

                            <label for="itemCategory">Item Category:</label><br />
                            <select id="itemCategory" name="itemCategory" onChange={(e) => onInputChange(e)} value={itemCategory} required>
                                <option value="" disabled>Select Item Category</option>
                                <option value="Apparel & Fashion">Apparel & Fashion</option>
                                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                                <option value="Health & Beauty">Health & Beauty</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Home & Furniture">Home & Furniture</option>
                            </select><br />

                            <label for="itemQty">Item Quantity:</label><br />
                            <input type="number" id="itemQty" value={itemQty} onChange={(e) => onInputChange(e)} name="itemQty" required /><br />

                            <label for="itemDetails">Item Details:</label><br />
                            <textarea id="itemDetails" onChange={(e) => onInputChange(e)} name="itemDetails" value={itemDetails} required></textarea><br />

                            <label for="itemImage">Item Image:</label><br />
                            <input
                                type="file"
                                id="itemImage"
                                name="itemImage"
                                accept="image/*"
                                onChange={(e) => onInputChange(e)}
                            />
                            <br />

                            <button type="submit" className='fom_btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem
