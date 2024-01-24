import React from 'react';
import Home from './Home';
import About from './About';
import Services from './Services';
import Products from './Products';
import Contact from './Contact';

export function MainContent({ selectedComponent }) {
    let componentToRender;

    switch (selectedComponent) {
        case 'Home':
        case null:
            componentToRender = <Home />;
            break;
        case 'About':
            componentToRender = <About />;
            break;
        case 'Services':
            componentToRender = <Services />;
            break;
        case 'Products':
            componentToRender = <Products />;
            break;
        case 'Contact':
            componentToRender = <Contact />;
            break;
        default:
            componentToRender = null;
    }

    return (
        <div className="main-content" style={{ width: '80%' }}>
            {componentToRender}
        </div>
    );
}
