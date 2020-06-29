import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Post = (props) => {
    const match = useRouteMatch();

    const {
        id = "",
        title = "",
        brief = "",
        timestamp = "",
    } = props;

    return (
        <div className="post">
            <h1>{title}</h1>

            <div className="post__time">
                {timestamp}
            </div>

            <p>
                {brief}
            </p>

            <Link to={match.path + id}>Edit</Link>
        </div>
    )
};

export default Post;
