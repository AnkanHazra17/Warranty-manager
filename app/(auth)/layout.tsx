import React from 'react';

function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="h-screen flex items-center justify-center bg-secondary">
            {children}
        </div>

    );
}

export default Layout;