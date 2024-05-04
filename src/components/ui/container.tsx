import React from 'react';
import {cn} from "@/lib/utils.ts";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}

export const Container = ({className, noPadding, children}: ContainerProps) => {
  return (
    <div className={cn("w-full flex justify-center", !noPadding && 'my-6 px-4')}>
      <div className={cn("flex flex-col w-full items-center max-w-7xl", className)}>
        {children}
      </div>
    </div>
  );
}