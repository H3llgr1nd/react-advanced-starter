export const validateForm = (values) => {
  const errors = {};

  if (!values.user) errors.user = 'User is required';
  if (!values.title) errors.title = 'Title is required';
  if (!values.description) errors.description = 'Description is required';
  if (!values.imageUrl) {
    errors.imageUrl = 'Image URL is required';
  } else if (!/^https?:\/\/.+\..+/.test(values.imageUrl)) {
    errors.imageUrl = 'Invalid URL format';
  }
  if (!values.location) errors.location = 'Location is required';
  if (!values.startTime) errors.startTime = 'Start time is required';
  if (!values.endTime) {
    errors.endTime = 'End time is required';
  } else if (new Date(values.endTime) <= new Date(values.startTime)) {
    errors.endTime = 'End time must be after start time';
  }
  return errors;
}

export const getReadableDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');  
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');  
  const minutes = date.getMinutes().toString().padStart(2, '0'); 
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
