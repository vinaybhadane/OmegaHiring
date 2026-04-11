import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  return {
    title: `Job ${params.id}`,
    description: `Apply for job ${params.id}`,
  };
}

export default function JobPage({ params }: Props) {
  return <h1>Job ID: {params.id}</h1>;
}