import React from "react";
import { AlertTriangle, Info, ShieldAlert, CheckCircle2 } from "lucide-react";

const ICONS = {
  info: Info,
  warn: AlertTriangle,
  danger: ShieldAlert,
  success: CheckCircle2,
};

const COLORS = {
  info: "text-primary",
  warn: "text-amber-500",
  danger: "text-red-500",
  success: "text-emerald-500",
};

export default function Callout({ type = "info", title, children }) {
  const Icon = ICONS[type] ?? Info;
  return (
    <div
      className={`callout callout-${type} my-5`}
      data-testid={`callout-${type}`}
    >
      <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${COLORS[type]}`} />
      <div className="space-y-1">
        {title ? (
          <div className="font-semibold text-foreground">{title}</div>
        ) : null}
        <div className="text-sm text-foreground/85 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
