import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-neutral-600 dark:focus:ring-neutral-300",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-gray-50 shadow hover:bg-primary dark:bg-primary dark:text-neutral-50 dark:hover:bg-primary",
                secondary:
                    "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
                destructive:
                    "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80",
                warning:
                    "border-transparent bg-yellow-500 text-gray-50 shadow hover:bg-yellow-500/80 dark:bg-yellow-900 dark:text-neutral-50 dark:hover:bg-yellow-900/80",
                outline: "text-gray-950 dark:text-neutral-50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
