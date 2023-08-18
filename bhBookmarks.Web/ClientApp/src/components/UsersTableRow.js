import React from "react";

function UsersTableRow({ bookmark, onEditClick, onDeleteClick, isEditing, onTitleChange, onCancelClick }) {
    const { title, url } = bookmark

    return (
        <tr>
            <td>{isEditing ? <input type='text' className='form-control' value={title}
              onChange={onTitleChange}  placeholder='Title' /> : title}</td>
            <td>{bookmark.url}</td>
            <td> {!isEditing ? <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                : <button className="btn btn-success" onClick={onEditClick}>Update</button>}
                {isEditing && <button className="btn btn-info" onClick={onCancelClick}>Cancel</button>}
               {!isEditing && <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>}
            </td>
        </tr >
    )
}

export default UsersTableRow
