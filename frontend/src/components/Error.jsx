import { Squirrel } from "lucide-react";
function Error() {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 min-h-screen text-gray-500">
      <span>
        <Squirrel className="h-6 w-6 md:h-10 md:w-10 mt-1.5"/>
      </span>
      <div>
        <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm">
          Sorry, but we cannot find the page you are looking for...
        </p>
      </div>
    </div>
  );
}

export default Error;
