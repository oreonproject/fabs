import BuildClient from "./Client";

type Params = { params: Promise<{ id: string }> };

export default async function BuildPage({ params }: Params) {
  const { id } = await params;
  return <BuildClient id={id} />;
}
