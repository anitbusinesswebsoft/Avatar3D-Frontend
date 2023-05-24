import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import './TreeTable.css';
import axios from 'axios';


function TreeTable(props) {
    const { data } = props;

    return (
        <table className="tree-table">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Parent CategoryId</th>
                    <th>Is Color Available</th>
                    <th>Category Guid</th>
                    <th>GBL Guid</th>
                    <th>----</th>
                </tr>
            </thead>
            <tbody>
                {data.map(category => (
                    <React.Fragment key={category._id}>
                        <tr className="category-row">
                            <td>{category.categoryName || `---`}</td>
                            <td>{category.parentCategoryId || `---`}</td>
                            <td>{category.isColorAvailable ? "Yes" : "No"}</td>
                            <td>{category.categoryGuid || `---`}</td>
                            <td>{category.gblGuid || `---`}</td>
                            <td>
                                <Button onClick={() => props.deleteFn(category._id)} className="btn-sm m-1" variant="secondary">Delete</Button>
                                <Button onClick={() => props.editFn(category)} className="btn-sm mx-1" variant="secondary">Edit</Button>
                            </td>
                        </tr>
                        {category.subCategories.map(subcategory => (
                            <tr key={subcategory._id} className="subcategory-row">
                                <td>{subcategory.categoryName}</td>
                                <td>{subcategory.parentCategoryId}</td>
                                <td>{subcategory.isColorAvailable ? "Yes" : "No"}</td>
                                <td>{subcategory.categoryGuid}</td>
                                <td>{subcategory.gblGuid}</td>
                                <td>
                                    <Button onClick={() => props.deleteFn(subcategory._id)} className="btn-sm" variant="secondary">Delete</Button>
                                    <Button onClick={() => props.editFn(subcategory)} className="btn-sm mx-2" variant="secondary">Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}

export default function Treetable(props) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const data = getAllResults()
    }, []);
    useEffect(() => {
        setData(props.updatedData)
    }, [props.updatedData])

    const getAllResults = async () => {
        const allResults = await axios.get(`${import.meta.env.VITE_API_URL}/category/getAllResults`)
        setData(allResults.data.newresults)
    }
    const deleteFn = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
        getAllResults()
    }

    return (
        <div className='container' style={{ margin: "100px " }} >
            <div className='d-flex justify-content-between' >
                <h2>Categories</h2>
                <Button onClick={props.setShowForm} className='btn-sm px-4 py-0'>Add </Button>
            </div>
            <TreeTable deleteFn={deleteFn} editFn={props.editFn} data={data} />
        </div>
    )
}
