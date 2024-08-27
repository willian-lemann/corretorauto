export default function Loading() {
  return (
    <div className="bg-white/60 top-0 flex items-center justify-center h-full absolute w-full overflow-hidden">
      <div className="flex space-x-2 justify-center items-center ">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
