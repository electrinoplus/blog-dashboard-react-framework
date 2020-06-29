import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditPostContainer from './EditPostContainer';

const SinglePostContainer = () => {
    const { id } = useParams();

    const [ fetchStatus, updateFetchStatus ] = useState('IDLE');
    const [ fetchError, updateFetchError ] = useState(null);
    const [ post, updateSinglePost ] = useState([]);

    useEffect(() => {
        updateFetchStatus('STARTED');

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${id}`)
            .then(response => response.json())
            .then((post) => {
                updateSinglePost(post);
                updateFetchStatus('SUCCEED');
            })
            .catch(err => {
                updateFetchError(err.message);
                updateFetchStatus('FAILED');
            })
    }, [id]);

    return (
        <div className="post-container">
            { (fetchStatus === 'IDLE' || fetchStatus === 'STARTED') && 'Loading...' }
            { fetchStatus === 'FAILED' && fetchError }
            { fetchStatus === 'SUCCEED' && (
                <EditPostContainer
                    title={post.title}
                    brief={post.brief}
                    detailed={post.detailed}
                />
            )}
        </div>
    )
};

export default SinglePostContainer;