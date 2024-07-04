import React, { Suspense, ReactNode } from "react";

interface CustomSuspenseProps {
    children: ReactNode;
}

const CustomSuspense: React.FC<CustomSuspenseProps> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen justify-center items-center">
                    <div className="flex items-center gap-1">
                        <span className="loading loading-spinner loading-sm"></span>
                        <span>Memuat data...</span>
                    </div>
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default CustomSuspense;
