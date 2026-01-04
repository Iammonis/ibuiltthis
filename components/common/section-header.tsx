import { LucideIcon } from "lucide-react";
import React from "react";

export const SectionHeader = ({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-primary size-6" />
        <h2 className="font-bold text-3xl">{title}</h2>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  );
};
