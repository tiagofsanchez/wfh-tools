import { useState , useEffect } from 'react';


const useWindowWidth = () => { 
  if (typeof window === 'undefined') return;  
  const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      if (typeof window === 'undefined') return;
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });
    return width
  }

  export default useWindowWidth;