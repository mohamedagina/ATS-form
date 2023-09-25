type validationResult = {
  isValid: boolean;
  error?: string;
};

export const validateImage = (
  file: File,
  maxSizeInMB: number = 1
): validationResult => {
  if (!file.type.includes('image/'))
    return { isValid: false, error: 'Please upload an image!' };
  if (file.size > maxSizeInMB * 1024 ** 2)
    return {
      isValid: false,
      error: `Please choose an image less than ${maxSizeInMB}MB!`
    };

  return { isValid: true };
};
