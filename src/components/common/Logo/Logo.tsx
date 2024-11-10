import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

/**
 * Logo component extracted for reusability and separation of concerns.
 * Displays the application logo and links to the homepage.
 */
const Logo: React.FC = memo(() => (
    <div className="">
        <Link to="/" className="logo">
            <FileText className="logo__icon" />
            <span>CV Manager</span>
        </Link>
    </div>
));

export default Logo;
