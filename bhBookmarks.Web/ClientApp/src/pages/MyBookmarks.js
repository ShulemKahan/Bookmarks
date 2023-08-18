import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersTableRow from "../components/UsersTableRow";
import { produce } from "immer";
import { useUserContext } from '../UserContext'
const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([])
    const [editBookmarks, setEditBookmarks] = useState([])

    useEffect(() => {

        getBookmarks()
    }, [])

    const getBookmarks = async () => {
        const { data } = await axios.get('api/bookmark/getbookmarksbyid')

        await setBookmarks(data)
    }


    const onEditClick = (id) => {
        setEditBookmarks([...editBookmarks, id])
    }

    const isEditing = (id) => {
        return editBookmarks.some(i => i === id)
    }

    const onTitleChange = (e, id) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            draftBookmarks.find(b => b.id === id).title = e.target.value;
        });
        setBookmarks(nextState);
    }

    const onCancelClick = async (id) => {

        const newList = editBookmarks.filter(b => b !== id)
        setEditBookmarks(newList)
        await getBookmarks()
    }

    const onDeleteClick = async (b) => {
        await axios.post(`api/bookmark/deletebookmark`, b)

        getBookmarks()
    }

    const { user } = useUserContext()

    return (
        <div className="container">
            <div className="col-md-10">
                <div className="row"><h2>Welcome {user.firstName + ' ' + user.lastName}</h2></div>
                <table className="table table-bordered bg-light">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!bookmarks && bookmarks.map((b, i) => <UsersTableRow
                            key={i}
                            bookmark={b}
                            onEditClick={() => onEditClick(b.id)}
                            isEditing={isEditing(b.id)}
                            onTitleChange={(e) => onTitleChange(e, b.id)}
                            onCancelClick={() => onCancelClick(b.id)}
                            onDeleteClick={() => onDeleteClick(b)}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyBookmarks