import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddItem() {
    const [inventory, setInventory] = useState({
        itemId: '',
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: '',
        itemImage: ''
    });
    const{itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

    const onInputChange = (e) => {
        if (e.target.name === 'itemImage'){
            setInventory({ ...inventory, itemImage: e.target.files[0] });
        }else{
            setInventory({...inventory, [e.target.name]: e.target.value });
        }
    }


    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", inventory.itemImage);
        let itemName = "";

        try{
            const response = await axios.post("http://localhost:8081/inventory/itemIms",formData)({
                headers: {
                    'Content-Type':'multipart/form-data'
                },
            });
            imageName = response.data;

        } catch (error) {
            alert("error uploading image");
            return;
        }

        const updateInventory = {...inventory, itemImage: imageName};
        await axios.post("http://localhost:8081/inventory",updateInventory);
        alert("errorr uploading image");
        return;
    }


  return (
    <div>
      <div>
        <p className="auth_topic">Add Item</p>
        <div className="from_vontiner">
            <div className="from_sub_coon">
                <form id="itemForm" onSubmit={(e) => onsubmit(e)}>
                    <label htmlFor="itemId">Item ID:</label><br />
                    <input type="text" id="itemId" name="itemId" onChange={(e)=> onInputChange(e)} value={itemId} required /><br />

                    <label htmlFor="itemName">Item Name:</label><br />
                    <input type="text" id="itemName" name="itemName" onChange={(e)=> onInputChange(e)} value={itemName} required /><br />

                    <label htmlFor="itemCategory">Item Category:</label><br />
                    <select id="itemCategory" name="itemCategory" onChange={(e)=> onInputChange(e)} value={itemCategory} required>
                    <option value="">Select Item Category</option>
                    <option value="Apparel & Fashion">Apparel & Fashion</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Home & Furniture">Home & Furniture</option>
                    </select><br />

                    <label htmlFor="itemQty">Item Quantity:</label><br />
                    <input type="number" id="itemQty" onChange={(e)=> onInputChange(e)} value={itemQty} name="itemQty" required /><br />

                    <label htmlFor="itemDetails">Item Details:</label><br />
                    <textarea id="itemDetails" onChange={(e)=> onInputChange(e)} value={itemDetails} name="itemDetails" required></textarea><br />

                    <label htmlFor="itemImage">Item Image:</label><br />
                    <input
                    type="file"
                    id="itemImage"
                    name="itemImage"
                    accept="image/*"
                    onChange={(e)=> onInputChange(e)}
                    /><br />

                    <button type="submit" className="fom_btn">Submit</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
