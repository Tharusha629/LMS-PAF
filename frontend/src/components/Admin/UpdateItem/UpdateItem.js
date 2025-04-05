import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
function UpdateItem() {
    const { id } = useParams();
    const [fromData, setFromData] = useState({
        itemId: '',
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: '',
        itemImage: null,
    });
    useEffect(() => {
        const fechItemData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/inventory/${id}`);
                const itemData = response.data;
                setFromData({
                    itemId: itemData.itemId || '',
                    itemName: itemData.itemName || '',
                    itemCategory: itemData.itemCategory || '',
                    itemQty: itemData.itemQty || '',
                    itemDetails: itemData.itemDetails || '',
                    itemImage: null
                });
            } catch (err) {
                console.error('error fech data : ', err);
            }
        };
        fechItemData();
    }, [id]);

    const onInputChange = (e) => {
        const { name, value, files } = e.target;
        setFromData({
            ...fromData,
            [name]: files ? files[0] : value,
        })
    };
    const onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('itemDetails', JSON.stringify({
            itemId: fromData.itemId,
            itemName: fromData.itemName,
            itemCategory: fromData.itemCategory,
            itemDetails: fromData.itemDetails,
            itemQty: fromData.itemQty,
        }));

        if (fromData.itemImage) {
            data.append('file', fromData.itemImage);
        }

        try {
            const response = await axios.put(`http://localhost:8080/inventory/${id}`, data);
            alert("Item updated")
            window.location.href = "/allitems";
        } catch (err) {
            console.error('error updating data : ', err);
            alert("Error updating item");
        }
    };
    return (
        <div>
            <h1>Update Item</h1>
            <div>
                <p className='auth_topic'>Add Item</p>
                <div className="from_vontiner">
                    <div className="from_sub_coon">
                        <form id="itemForm" onSubmit={onsubmit}>
                            <label for="itemId">Item ID:</label><br />
                            <input type="text" id="itemId" name="itemId" onChange={onInputChange} value={fromData.itemId} required /><br />

                            <label for="itemName">Item Name:</label><br />
                            <input type="text" id="itemName" name="itemName" onChange={ onInputChange} value={fromData.itemName} required /><br />

                            <label for="itemCategory">Item Category:</label><br />
                            <select id="itemCategory" name="itemCategory" onChange={onInputChange} value={fromData.itemCategory} required>
                                <option value="" disabled>Select Item Category</option>
                                <option value="Apparel & Fashion">Apparel & Fashion</option>
                                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                                <option value="Health & Beauty">Health & Beauty</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Home & Furniture">Home & Furniture</option>
                            </select><br />

                            <label for="itemQty">Item Quantity:</label><br />
                            <input type="number" id="itemQty" value={fromData.itemQty} onChange={ onInputChange} name="itemQty" required /><br />

                            <label for="itemDetails">Item Details:</label><br />
                            <textarea id="itemDetails" onChange={onInputChange} name="itemDetails" value={fromData.itemDetails} required></textarea><br />

                            <label for="itemImage">Item Image:</label><br />
                            <input
                                type="file"
                                id="itemImage"
                                name="itemImage"
                                accept="image/*"
                                onChange={onInputChange}
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

export default UpdateItem
