import React from "react";

const Alert = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`
      rounded-lg border p-4
      ${
        variant === "destructive"
          ? "border-red-500 bg-red-50 text-red-700"
          : "border-gray-200 bg-white text-gray-900"
      }
      ${className}
    `}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`mt-2 text-sm ${className}`} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };
