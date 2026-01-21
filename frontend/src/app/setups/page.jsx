import WithNav from "@/comps/PageWrappers/WithNav.jsx";
import CodeBlock from "@/comps/Code/CodeBlock";

export default function SetupsPage() {
  const AppleSetup = `
    
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

   `;

  return (
    <WithNav>
      <CodeBlock name="Setup Instructions" code={AppleSetup} language="bash" />
    </WithNav>
  );
}
