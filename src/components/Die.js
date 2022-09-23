import React from 'react';

function Die({value, isHeld, onClick}) {
  const className = isHeld ? 'die held' : 'die';
  return (
    <div 
    className={className}
    onClick={onClick}    
    >
      {value}
    </div>
  );
}

export default Die;
