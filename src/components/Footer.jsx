// src/components/Footer.jsx 
import React from 'react'; 
function Footer() { 
return ( 
<footer style={{ 
backgroundColor: '2c3e50', 
color: 'white', 
padding: '1rem', 
textAlign: 'center', 
marginTop: '2rem' 
}}> 
<p>© {new Date().getFullYear()} AI Academy. Tous droits réservés.</p> 
</footer> 
); 
} 
export default Footer;