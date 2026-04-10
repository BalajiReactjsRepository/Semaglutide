const ErrorFallback = ({ error, reset }) => {
  return (
    <div className='d-flex flex-column align-items-center vh-100'>
      <div className='text-center'>
        <h2>⚠️ Something went wrong</h2>

        <p>{error?.message || "Unexpected error occurred"}</p>

        <button className='btn btn-secondary' onClick={reset}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
