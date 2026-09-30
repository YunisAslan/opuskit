"use client";
// The kit's step bar: three wide cards, each a live summary of its step, over one progress rail.
// 1 Style and 2 Pages live in the kit; 3 Recipe is the result page itself — the same bar shows there, so it reads as one flow.
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Files,
  LayoutTemplate,
  Palette,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { EMPTY_PLAN } from "@/features/kit/plan";
import { planSummary, readPlan, writePlan } from "@/lib/kit";
import type { KitPlan } from "@/types/domain";
import { lookOf } from "./ProductVisual";

export type KitStep = "style" | "pages" | "recipe";

export function StepBar({
  plan,
  step,
  onGo,
  sticky = true,
}: {
  plan: KitPlan;
  step: KitStep;
  onGo: (s: KitStep) => void;
  sticky?: boolean;
}) {
  const look = lookOf(plan);
  const sum = planSummary(plan);
  const router = useRouter();
  // Clears the kit back to "What are you making?". Recipes already made stay saved; Undo brings the draft back.
  const startOver = () => {
    const before = readPlan();
    writePlan(EMPTY_PLAN);
    router.push("/kit");
    toast("Kit cleared — starting over", {
      description: "Recipes you already made stay saved.",
      action: { label: "Undo", onClick: () => writePlan(before) },
    });
  };
  const steps: {
    id: KitStep;
    n: number;
    name: string;
    icon: typeof Palette;
    peek: ReactNode;
  }[] = [
    {
      id: "style",
      n: 1,
      name: "Style",
      icon: Palette,
      peek: (
        <>
          <span className="flex shrink-0 -space-x-1">
            {(["background", "text", "primary", "accent"] as const).map((r) => (
              <span
                key={r}
                className="size-3 rounded-full ring-1 ring-black/10"
                style={{ background: look.colors[r] }}
              />
            ))}
          </span>
          <span className="truncate">{look.d.name}</span>
        </>
      ),
    },
    {
      id: "pages",
      n: 2,
      name: "Pages",
      icon: LayoutTemplate,
      peek: (
        <>
          <span className="truncate">
            {sum.pages} page{sum.pages === 1 ? "" : "s"}
          </span>
        </>
      ),
    },
    {
      id: "recipe",
      n: 3,
      name: "Recipe",
      icon: FileText,
      peek: <span className="truncate">Recipe + Build Package</span>,
    },
  ];
  const idx = steps.findIndex((s) => s.id === step);

  return (
    <div
      className={`${sticky ? "sticky top-16 z-30" : ""} border-b border-line bg-paper/95 backdrop-blur-sm`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 md:px-8">
        <div className="hidden w-40 shrink-0 leading-tight xl:block">
          <span className="block text-[11px] uppercase tracking-wider text-muted">
            Building
          </span>
          <span className="block truncate font-medium">
            {plan.name || "Untitled site"}
          </span>
        </div>
        <ol
          className="grid min-w-0 flex-1 grid-cols-3 gap-1.5 max-sm:basis-full"
          aria-label="Steps"
        >
          {steps.map((s, i) => {
            const on = step === s.id,
              done = i < idx;
            return (
              <li key={s.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => onGo(s.id)}
                  aria-current={on ? "step" : undefined}
                  className={`group flex h-full w-full min-w-0 items-center gap-3 rounded-lg px-3 py-2 max-sm:flex-col max-sm:items-start max-sm:gap-0.5 max-sm:px-2.5 text-left transition-colors ${on ? "bg-ink text-paper" : "bg-white/60 ring-1 ring-line hover:bg-white hover:ring-ink"}`}
                >
                  <span
                    className={`display grid h-5 shrink-0 place-items-center text-lg tabular-nums sm:h-9 sm:w-10 sm:text-[1.9rem] ${on ? "text-paper" : done ? "text-pencil" : "text-line"}`}
                  >
                    {done ? (
                      <Check
                        strokeWidth={2.5}
                        className="size-4 sm:size-[26px]"
                        aria-hidden
                      />
                    ) : (
                      `0${s.n}`
                    )}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="flex min-w-0 items-center gap-1.5 font-medium max-sm:text-sm">
                      <s.icon
                        size={14}
                        aria-hidden
                        className={`shrink-0 max-sm:hidden ${on ? "opacity-80" : "text-muted"}`}
                      />
                      <span className="truncate">{s.name}</span>
                    </span>
                    <span
                      className={`mt-1 hidden min-w-0 items-center gap-1.5 text-xs sm:flex ${on ? "text-paper/70" : "text-muted"}`}
                    >
                      {s.peek}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="flex items-center justify-end gap-2 max-sm:w-full sm:w-[17rem] sm:shrink-0">
          <button
            type="button"
            className="btn btn-sm inline-flex shrink-0 items-center gap-1.5 px-3 text-ink-2 hover:bg-white hover:text-ink max-sm:mr-auto"
            onClick={startOver}
          >
            <RotateCcw size={15} aria-hidden />
            Start over
          </button>
          <button
            type="button"
            aria-label="Back"
            disabled={idx === 0}
            className="btn btn-line btn-sm disabled:invisible inline-flex items-center gap-1.5"
            onClick={() => onGo(steps[idx - 1].id)}
          >
            <ArrowLeft size={14} aria-hidden />
          </button>
          {step !== "recipe" && (
            <button
              type="button"
              className="btn btn-ink btn-sm inline-flex items-center gap-1.5"
              onClick={() => onGo(steps[idx + 1].id)}
            >
              Next
              <ArrowRight size={14} aria-hidden />
            </button>
          )}
        </div>
      </div>
      <div aria-hidden className="h-[3px] bg-line/60">
        <div
          className="h-full origin-left bg-pencil transition-transform duration-500 motion-reduce:transition-none"
          style={{ transform: `scaleX(${(idx + 1) / steps.length})` }}
        />
      </div>
    </div>
  );
}
