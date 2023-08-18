import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UsersTableRow({ bookmark, onEditClick, onDeleteClick, isEditing, onTitleChange, onCancelClick,onUpdateClick }) {
    const { title, url } = bookmark

    return (
        <tr>
            <td>{isEditing ? <input type='text' className='form-control' value={title}
              onChange={onTitleChange}  placeholder='Title' /> : title}</td>
            <td>{<a href={url} target="_blank">{url}</a>}</td>
            <td> {!isEditing ? <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                : <button className="btn btn-success" onClick={onUpdateClick}>Update</button>}
                {isEditing && <button className="btn btn-info" onClick={onCancelClick}>Cancel</button>}
               {!isEditing && <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>}
            </td>
        </tr >
    )
}

export default UsersTableRow
