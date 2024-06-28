import React from 'react';

const ValidationError = ({ message }) => {
    return (
        <div className="invalid-feedback">
            {message}
        </div>
    );
};

export default ValidationError;