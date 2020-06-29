import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import EditPostForm from '../components/EditPostForm';

const EditPostContainer = (props) => {
    const { id } = useParams();

    const [ fetchStatus, updateFetchStatus ] = useState('IDLE');
    const [ , updateFetchError ] = useState(null);

    const [ title, updateTitleValue ] = useState(props.title);
    const [ brief, updateBriefValue ] = useState(props.brief);
    const [ detailed, updateDetailedValue ] = useState(props.detailed);

    const updateTitleValueHandler = (event) => updateTitleValue(event.target.value);
    const updateBriefValueHandler = (event) => updateBriefValue(event.target.value);
    const updateDetailedValueHandler = (event) => updateDetailedValue(event.target.value);

    const fetching = fetchStatus === 'STARTED';

    const onSubmit = (event) => {
        event.preventDefault();
        updateFetchStatus('STARTED');

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, brief, detailed }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((post) => {
                updateTitleValue(post.title)
                updateBriefValue(post.brief)
                updateDetailedValue(post.detailed)

                updateFetchStatus('SUCCEED');
            })
            .catch(err => {
                updateFetchError(err.message);
                updateFetchStatus('FAILED');
            })
    }

    return (
        <EditPostForm
            onSubmit={onSubmit}
            title={title}
            disabled={fetching}
            updateTitleValueHandler={updateTitleValueHandler}
            brief={brief}
            updateBriefValueHandler={updateBriefValueHandler}
            detailed={detailed}
            updateDetailedValueHandler={updateDetailedValueHandler}
        />)
    ;
};

export default EditPostContainer;