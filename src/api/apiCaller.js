export const apiCaller = async ({
  apiCall,
  onSuccess,
  onError,
  setLoading,
}) => {
  try {
    setLoading && setLoading(true);

    const response = await apiCall();

    onSuccess && onSuccess(response.data);
  } catch (error) {
    console.log(error);
    onError && onError(error);
  } finally {
    setLoading && setLoading(false);
  }
};
