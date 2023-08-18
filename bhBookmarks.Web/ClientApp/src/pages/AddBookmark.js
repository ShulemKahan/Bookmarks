import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {
    const [bookmark, setBookmark] = useState({
        title: '',
        url: ''
    })

    const history = useHistory();

    const onButtonClick = async () => {
        await axios.post(`/api/bookmark/addbookmark`, bookmark)
        
        history.push('/mybookmarks')
    }
    const onTextchange = (e) => {
        const newBookmark = produce(bookmark, draft => {
            draft[e.target.name] = e.target.value;
        });
        setBookmark(newBookmark);
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-8 offset-md-2 jumbotron'>
                    <h3>Add new post</h3>
                    <input type='text' className='form-control' placeholder='Title' name='title' value={bookmark.title} onChange={onTextchange} />
                    <br />
                    <input type='text' className='form-control' placeholder='Url' name='url' value={bookmark.url} onChange={onTextchange} />
                    <br />
                    <button className='btn btn-primary' disabled={!bookmark.title || !bookmark.url} onClick={onButtonClick}>Add bookmark</button>
                </div>
            </div>
        </div>
    )
}

export default AddBookmark;