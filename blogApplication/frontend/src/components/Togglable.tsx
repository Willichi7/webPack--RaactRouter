import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Togglable = React.forwardRef((props: { children, buttonLabel }, refs) => {
   const [visible, setVisible] = useState(false);

   const hideWhenVisible = { display: visible ? 'none' : '' };
   const showWhenVisible = { display: visible ? '' : 'none' };

   const toggleVisibility = () => {
      setVisible(!visible);
   };

   useImperativeHandle(refs, () => ({
      toggleVisibility
   }));

   return (
      
      <Box>
         <Box style={hideWhenVisible}>
            <Button variant="contained" onClick={toggleVisibility}>
               {props.buttonLabel}
            </Button>
         </Box>
         <Box style={showWhenVisible}>
            {props.children}
            <Button variant="contained" onClick={toggleVisibility}>
               Cancel
            </Button>
         </Box>
      </Box>
   );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
   buttonLabel: PropTypes.string.isRequired
};

export default Togglable;