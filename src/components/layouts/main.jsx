import React from 'react';

export const MainLayout = ({ children }) => {
    return (
        <div className = 'container' >
            <div>
                <div>
                    Header
                </div>
                { children }
            </div>
            <div>
                Footer
            </div>
        </div>
    );
};
