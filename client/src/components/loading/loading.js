import React from 'react';
import LoadingSwirly from './images/loading.gif';

const Loading = () => {
    return (
        <div className="text-center">
            <img src={LoadingSwirly} alt={'Loading'} />
        </div>
    );
};

export default Loading;
