/**
 * Minimal smoke component to verify pet-ui design tokens compile in Storybook.
 *
 * @param {string} [label] - Visible text inside the probe block
 */
function TailwindCheck({ label = "pet-ui Tailwind OK" }: { label?: string }) {
  return (
    <div className="rounded-lg bg-action-primary px-4 py-2 text-action-primary-text">
      {label}
    </div>
  )
}

export default TailwindCheck
