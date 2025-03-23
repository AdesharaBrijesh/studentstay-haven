
/**
 * Utility functions for working with property data
 */

/**
 * Converts property type codes to human-readable labels
 */
export const getPropertyTypeLabel = (type: string) => {
  switch(type) {
    case 'pg':
      return 'PG';
    case 'hostel':
      return 'Hostel';
    case 'shared-apartment':
      return 'Shared Apartment';
    case 'single-room':
      return 'Single Room';
    case 'dormitory':
      return 'Dormitory';
    case 'student-housing':
      return 'Student Housing';
    case 'shared-house':
      return 'Shared House';
    default:
      return type;
  }
};
