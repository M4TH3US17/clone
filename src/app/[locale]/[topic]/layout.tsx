import { use } from "react";

export default function TopicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ topic: string }>;
}) {
    
  const { topic } = use(params);

    return (
        <section data-topic={topic}>
            {children}
        </section>
    );
}
