import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "!rounded-md !shadow-lg !text-sm !font-medium",
          title: "!text-base",
          description: "!text-muted-foreground",
          success:
            "!bg-green-100 !text-green-800 dark:!bg-green-900 dark:!text-green-200",
          error:
            "!bg-red-100 !text-red-800 !dark:bg-red-900 dark:!text-red-200",
          warning:
            "!bg-yellow-100 !text-yellow-800 dark:!bg-yellow-900 dark:!text-yellow-200",
          info: "!bg-blue-100 !text-blue-800 dark:!bg-blue-900 dark:!text-blue-200",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
