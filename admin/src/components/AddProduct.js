import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [quality, setQuality] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              images: images.split(','),
              name,
              price: Number(price),
              amount: Number(price),
              category,
              quality,
              description
          }
          ),
      };
      const response = await fetch('http://localhost:5000/api/v1/products', requestOptions)
      if(response.status === 201){
          // getProducts()
          navigate('/allproducts')
      } else {
          return;
      }
  };
  return (
    <div className='addproduct'>
      <form onSubmit={handleSubmit}>
                <div className="form-child">
                    <label htmlFor="images">Images</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        required
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-child">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-child">
                    <label htmlFor="quality">Quality</label>
                    <input
                        type="text"
                        id="quality"
                        name="quality"
                        required
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                    />
                </div>

                <button className="add-btn" type="submit">
                    Add
                </button>
            </form>
    </div>
  )
}
