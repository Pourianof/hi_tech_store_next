export default function Loading() {
  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center ">
      <div className="absolute left-0 top-0 w-full h-full bg-black/30 backdrop-blur-md -z-10"></div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full border-2 border-muted animate-ping opacity-20"></div>
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>

        <div className="space-y-2 text-center">
          <p className="font-semibold text-lg">Loading</p>
          <div className="flex justify-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
            <span
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
