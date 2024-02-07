import React from 'react';
import data from '../../data'

function Products() {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
