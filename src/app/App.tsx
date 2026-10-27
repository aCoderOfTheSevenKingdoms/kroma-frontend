function App() {
  
  return (
    <div 
      className="bg-[var(--color-primary-bg-color) p-6 space-y-4"
    >
      <h1 className="font-beatrice font-bold text-3xl text-[var(--color-primary-text-color)]">
        Beatrice Bold Heading
      </h1>
      <p className="font-beatrice font-semibold text-lg text-[var(--color-secondary-text-color)]">
        Beatrice SemiBold Subheading
      </p>
      <p className="font-beatrice font-medium text-md text-[var(--color-secondary-text-color)]">
        Beatrice Medium Subheading
      </p>
      <p className="font-beatrice font-normal text-base text-[var(--color-secondary-text-color)]">
        Beatrice Regular paragraph text.
      </p>
      <p className="font-beatrice font-light text-md text-[var(--color-secondary-text-color)]">
        Beatrice Light Subheading
      </p>
      <span className="font-beatrice font-thin text-sm text-[var(--color-tertiary-bg-color)] block">
        Beatrice Thin caption text.
      </span>
    </div>
  );
}

export default App
