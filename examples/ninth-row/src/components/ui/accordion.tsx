import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"

// Restyled: each question on a hairline, a plus that turns to a minus (two lines, one rotates), the answer's height
// opening on the drawer curve. Reduced motion: it opens at once.
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-(--color-border)", className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/acc flex min-h-16 flex-1 items-center justify-between gap-6 py-5 text-left transition-opacity duration-200 group-hover/faq:opacity-60 hover:opacity-100! focus-visible:opacity-100!",
          className
        )}
        {...props}
      >
        <span className="type-heading [font-size:clamp(1.2rem,1.7vw,1.5rem)] group-focus-visible/acc:underline group-focus-visible/acc:underline-offset-4">{children}</span>
        <span aria-hidden className="relative size-4 shrink-0 text-(--color-muted)">
          <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
          <span className="absolute top-1/2 left-0 h-px w-4 rotate-90 bg-current transition-transform duration-200 ease-(--ease-in-out) group-aria-expanded/acc:rotate-0 motion-reduce:transition-none" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-[350ms] ease-(--ease-drawer) data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("type-body max-w-[62ch] pb-6 text-(--color-muted)", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
