export const ErrorFallback = ({ error, reset }) => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <div className='text-center'>
        <h2>⚠️ Something went wrong</h2>

        <p style={{ color: "red" }}>
          {error?.message || "Unexpected error occurred"}
        </p>

        <button className='btn btn-primary mt-3' onClick={reset}>
          Try Again
        </button>
      </div>
    </div>
  );
};
