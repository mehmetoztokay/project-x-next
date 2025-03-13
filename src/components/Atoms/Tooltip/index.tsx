import React, { ReactNode } from "react";

type TooltipProps = {
  text: string;
  tooltipText?: string;
  position?: "top" | "bottom" | "left" | "right";
  bgColor?: string;
  textColor?: string;
  className?: string;
  children?: ReactNode;
};

export const Tooltip: React.FC<TooltipProps> & { Container: React.FC<TooltipProps> } = ({
  text,
  tooltipText,
  position = "top",
  bgColor = "bg-gray-800",
  textColor = "text-white",
  className = "",
  children,
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div className="group relative flex flex-col items-center">
      <span className="cursor-pointer font-medium text-blue-500">{text}</span>
      <div className={`absolute hidden flex-col items-center group-hover:flex ${positionClasses[position]}`}>
        <div className={`relative z-10 rounded-md px-4 py-2 text-xs shadow-lg ${bgColor} ${textColor} ${className}`}>
          {children ? children : tooltipText}
        </div>
        <div className={`-mt-1 h-3 w-3 rotate-45 ${bgColor}`} />
      </div>
    </div>
  );
};

// Container versiyonu, çocukları doğrudan alır
Tooltip.Container = ({ text, children, position = "top" }) => {
  return (
    <Tooltip text={text} position={position}>
      {children}
    </Tooltip>
  );
};
