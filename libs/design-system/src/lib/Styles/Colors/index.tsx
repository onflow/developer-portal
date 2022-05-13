const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 mr-12 flex ">{children}</div>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-h5 mb-4">{children}</div>
);

const Color = ({ name, className }: { name: string; className: string }) => (
  <div className="mr-4">
    <div className={`h-16 w-16 rounded-sm ${className}`} />
    <div className="mt-2 text-main-gray-300">{name}</div>
  </div>
);

export function Colors() {
  return (
    <div className="">
      <Heading>Primary</Heading>
      <Section>
        <Color name="green" className="bg-green" />
        <Color name="blue" className="bg-blue" />
        <Color name="purple" className="bg-purple" />
        <Color name="yellow" className="bg-yellow" />
        <Color name="pink" className="bg-pink" />
        <Color name="red" className="bg-red" />
      </Section>
      <Heading>Error/Success</Heading>
      <Section>
        <Color name="red-error" className="bg-red-error" />
        <Color name="green-success" className="bg-green-success" />
      </Section>
      <Heading>Neutrals</Heading>
      <Section>
        <Color name="gray-400" className="bg-gray-400" />
        <Color name="gray-300" className="bg-gray-300" />
        <Color name="gray-200" className="bg-gray-200" />
        <Color name="gray-100" className="bg-gray-100" />
        <Color name="gray-50" className="bg-gray-50" />
      </Section>
      <Heading>Button Hovers</Heading>
      <Section>
        <Color name="blue-hover" className="bg-blue-hover" />
      </Section>
      <Heading>Button Hovers Dark Mode</Heading>
      <Section>
        <Color name="blue-hover-dark" className="bg-blue-hover-dark" />
      </Section>
      <Heading>Primary - dark mode</Heading>
      <Section>
        <Color name="green-dark" className="bg-green-dark" />
        <Color name="blue-dark" className="bg-blue-dark" />
        <Color name="pink-dark" className="bg-pink-dark" />
      </Section>
      <Heading>Error/Success - dark mode</Heading>
      <Section>
        <Color name="red-error-dark" className="bg-red-error-dark" />
        <Color name="green-success-dark" className="bg-green-success-dark" />
      </Section>
      <Heading>Tool Gradients</Heading>
      <Section>
        <Color name="tool-gradient-cli" className="tool-gradient-cli" />
        <Color name="tool-gradient-fcl" className="tool-gradient-fcl" />
        <Color
          name="tool-gradient-emulator"
          className="tool-gradient-emulator"
        />
        <Color name="tool-gradient-vscode" className="tool-gradient-vscode" />
        <Color name="tool-gradient-testing" className="tool-gradient-testing" />
        <Color
          name="tool-gradient-flow-port"
          className="tool-gradient-flow-port"
        />
        <Color name="tool-gradient-cadence" className="tool-gradient-cadence" />
      </Section>
    </div>
  );
}
