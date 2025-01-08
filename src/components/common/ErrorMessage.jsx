import { PropTypes } from 'prop-types';
import React from 'react';
import { Alert, Box } from '@mui/material';

/**
 * Reusable error message component for displaying API and other errors
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {string} props.severity - Error severity (error, warning, info, success)
 */
const ErrorMessage = ({ message, severity = 'error' }) => {
  if (!message) return null;
  
  return (
    <Box sx={{ margin: '1rem 0' }}>
      <Alert severity={severity}>
        {message}
      </Alert>
    </Box>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

export default ErrorMessage;