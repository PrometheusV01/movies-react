import React from 'react';

//components
import { Header } from 'components/parts/header';
import { Footer } from 'components/parts/footer';
import { AddMovieModal } from 'components/modals/addMovie';

export const MainLayout = ({ children }) => {
    return (
        <div className = { 'main-container' } >
            <div>
                <div>
                    <Header />
                </div>
                <main>
                    { children }
                </main>
            </div>
            <div>
                <Footer />
            </div>

            <AddMovieModal />
        </div>
    );
};
