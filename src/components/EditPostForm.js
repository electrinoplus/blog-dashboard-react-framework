import React from 'react';

const EditPostForm = (props) => {
    const {
        onSubmit,
        title,
        disabled,
        updateTitleValueHandler,
        brief,
        updateBriefValueHandler,
        detailed,
        updateDetailedValueHandler,
    } = props;

    return (
        <form className="edit-post-form" onSubmit={onSubmit}>
            <input
                type="text"
                value={title}
                disabled={disabled}
                onChange={updateTitleValueHandler}
            />
            <br/>
            <input
                type="text"
                value={brief}
                disabled={disabled}
                onChange={updateBriefValueHandler}
            />
            <br/>
            <input
                type="text"
                value={detailed}
                disabled={disabled}
                onChange={updateDetailedValueHandler}
            />
            <br/>

            <input type="submit" value="Change" disabled={disabled}/>
        </form>
    );
};

export default EditPostForm;
